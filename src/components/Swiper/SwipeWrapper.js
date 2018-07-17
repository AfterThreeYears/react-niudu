import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@/components/Swiper/SwipeWrapper.css';
import { getProperties, getPropNumeric } from '@/utils/styles';
import { env } from '@/utils/ua';

const ua = env();
const properties = getProperties();

class SwipeWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transformX: this.props.initX,
      curIndex: this.props.index,
      cursorDatas: [],
    }
  }
  static propTypes = {
    initX: PropTypes.number,
    index: PropTypes.number,
    isShowCursor: PropTypes.bool,
  };
  static defaultProps = {
    initX: 0,
    index: 0,
    isShowCursor: true,
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.index !== prevState.curIndex) {
      return {
        curIndex: nextProps.index,
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.index !== prevState.curIndex) {
      console.log('update', 'old is', prevState.curIndex, 'new is ', this.props.index);
      this.changeIndexUpdateTransformX()
    }
  }
  componentDidMount() {
    this.init();
  }
  init() {
    // 获取swipeWrapper的宽度
    const swiperViewWidth = getPropNumeric(this.swiperWrap, 'width');
    // 获取展示给用户的swipe宽度
    const swiperFullWidth = getPropNumeric(this.swipeContainer, 'width');
    // 最大可以滑动的值
    const maxTransformX = swiperViewWidth - swiperFullWidth;
    const noNeedTouchEvent = maxTransformX >= 0;
    this.setState({
      swiperViewWidth,
      swiperFullWidth,
      maxTransformX,
      noNeedTouchEvent,
      cursorDatas: Array.from(this.swiperWrap.querySelectorAll('.swipe-item')),
    });
  }
  handleTouchStart = (e) => {
    const { noNeedTouchEvent } = this.state;
    if (noNeedTouchEvent) return;
    this.removeTransition();
    const { x } = this.getTouchPosition(e);
    this.setState({
      startTime: Date.now(),
      startX: this.state.transformX,
      // 手指按下的x
      prevTouchX: x,
    });
  }
  handleTouchMove = (e) => {
    e.preventDefault();
    const { x } = this.getTouchPosition(e);
    let swipeX = this.state.transformX + x - this.state.prevTouchX;
    this.setTransformX(swipeX);
    this.setState({
      // 每次移动后需要把当前移动到的x赋值给prevTouchX，否则（x - this.prevTouchX）越来越大，移动也越来越快
      prevTouchX: x,
    })
  }
  handleTouchEnd = (e) => {
    this.addTransition();
    this.resetTransition();
    this.startAutoScroll();
  }
  startAutoScroll = () => {
    const deltaT = Date.now() - this.state.startTime;
    const deltaX = this.state.transformX - this.state.startX;
    const v = deltaX / deltaT;
    // 速度一定时或拉到尽头时不滚动
    if (Math.abs(v) < 0.4 || deltaX === 0) {
      return;
    }
    let transformPosition = deltaX + this.state.transformX;
    if (deltaX > 0) {
      transformPosition = Math.min(0, transformPosition);
    } else {
      transformPosition = Math.max(this.state.maxTransformX, transformPosition);
    }
    this.setTransformX(transformPosition);
  }
  getTouchPosition = (e) => {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY,
    };
  }
  setTransformX = (x) => {
    this.setState({
      transformX: x,
    });
    const syncStyle = `translate(${x}px, 0) translateZ(0)`;
    this.swipeContainer.style[properties.transform] = syncStyle;
  }
  removeTransition = () => {
    this.swipeContainer.style[properties.transition] = 'none';
  }
  addTransition = () => {
    const syncStyle = `${properties.transform} .4s ${ua.android ? 'cubic-bezier(0.04, 0.74, 0.36, 1)' : ''}`;
    this.swipeContainer.style[properties.transition] = syncStyle;
  }
  resetTransition = () => {
    const { transformX, maxTransformX } = this.state;
    if (transformX > 0) {
      this.setTransformX(0);
    } else if (maxTransformX > transformX) {
      this.setTransformX(maxTransformX);
    }
  }
  changeIndexUpdateTransformX = () => {
    const { index } = this.props;
    const { swiperViewWidth, swiperFullWidth, cursorDatas } = this.state;
    if (index <= 0) {
      this.setTransformX(0);
      return;
    }
    // 当前游标的和开始的距离
    const delta = cursorDatas.slice(0, index)
                    .map(ele => getPropNumeric(ele, 'width'))
                    .reduce((total, current) => total + current, 0);
    // 当前游标宽度
    const cursorWidth = getPropNumeric(cursorDatas[index], 'width');
    // 游标修正位移
    const offset = swiperViewWidth / 2 - cursorWidth / 2;
    // 计算最终位移
    const transformX = offset - delta;
    // 前后位置修正
    const fixedX = Math.max(Math.min(transformX, 0), swiperViewWidth - swiperFullWidth);
    this.setTransformX(fixedX);
  }
  repositionCursor = () => {
    const { curIndex, cursorDatas } = this.state;
    const closeTransition = {
      transitionDuration: '0s',
    };
    const ele = cursorDatas[curIndex];
    if (!ele) return {};
    const span = ele.querySelector('span');
    if (!span) return {};
    console.log(span);
    return {
      [properties.transform]: `translateX(${ele.offsetLeft + span.offsetLeft}px) scaleX(${span.offsetWidth})`,
      ...closeTransition,
      display: 'block',
    };
  }
  render() {
    const { isShowCursor } = this.props;
    console.log('isShowCursor is ', isShowCursor);
    return (
      <div className={'swiper-wrap'} ref={ref => this.swiperWrap = ref}>
        <div className={'swipe-overflow'} >
          <div className={'swiper-container'}
            ref={ref => this.swipeContainer = ref}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
          >
            {this.props.children}
          </div>
          {isShowCursor ?
            <div
              ref={ref => this.cursorRef = ref}
              className={'SwipeItem-cursor-container'}
            >
              <div
                className={'SwipeItem-cursor'}
                style={this.repositionCursor()}
              ></div>
            </div> : undefined}
        </div>
      </div>
    );
  }
}

export default SwipeWrapper;
