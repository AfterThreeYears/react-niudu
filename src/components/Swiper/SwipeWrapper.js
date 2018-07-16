import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@/components/Swiper/SwipeWrapper.css';
import { getProperties } from '@/utils/styles';
import { env } from '/Users/shell/wbb/git/github/react-niudu/src/utils/ua';

const ua = env();
const properties = getProperties();

class SwipeWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transformX: this.props.initX || 0,
    }
  }
  componentDidMount() {
    console.log(this.swipeContainer.offsetWidth);
  }
  handleTouchStart = (e) => {
    this.removeTransition();
    const { x, y } = this.getTouchPosition(e);
    this.prevTouchX = x;
  }
  handleTouchMove = (e) => {
    const { x, y } = this.getTouchPosition(e);
    this.startScroll = false;
    e.preventDefault();
    let swipeX = this.state.transformX + x - this.prevTouchX;
    this.setTransformX(swipeX);
    this.prevTouchX = x;
  }
  handleTouchEnd = (e) => {
    this.addTransition();
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
  render() {
    return (
      <div className={'swiper-wrap'}>
        <div className={'swipe-overflow'} >
          <div className={'swiper-container'}
            ref={ref => this.swipeContainer = ref}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default SwipeWrapper;
