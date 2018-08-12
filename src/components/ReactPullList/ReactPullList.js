import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';
import throttle from 'lodash/throttle';

import styles from './ReactPullList.css';

export default class ReactPullList extends Component {
  static propTypes = {
    // 节流时间
    throttleTime: PropTypes.number,
    // 内容数组
    items: PropTypes.array.isRequired,
    // 内容render函数
    itemRenderer: PropTypes.func.isRequired,
    // 开始加载的阈值条数
    range: PropTypes.number,
    // 加载更多的函数
    handleLoaderMore: PropTypes.func,
    // 容器的样式
    style: PropTypes.object,
    // 是否没有更多数据了
    isNoMoreData: PropTypes.bool,
    // 是否正在加载中
    isFetching: PropTypes.bool,
    // 每次显示多少条
    pageSize: PropTypes.number,
  };
  static defaultProps = {
    throttleTime: 100,
    range: 5,
    style: {},
    isNoMoreData: false,
    isFetching: false,
    handleLoaderMore: () => {},
    pageSize: 100,
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  handleScrollTo(index) {
    this.reactList.scrollTo(index);
  }
  handleScroll = () => {
    const { range, handleLoaderMore, items, isNoMoreData } = this.props;
    if (isNoMoreData) return;
    const { loading } = this.state;
    if (this.reactList.getVisibleRange()[1] > items.length - range) {
      if (loading) return;
      this.handleSetLoadingStatus(true, () => {
        handleLoaderMore()
          .then(() => {
            this.handleSetLoadingStatus(false);
          });
      });
    }
  }
  handleSetLoadingStatus = (status, cb = () => {}) => {
    this.setState({ loading: status }, cb);
  }
  render() {
    const { itemRenderer, items, style, isNoMoreData, isFetching, pageSize, throttleTime } = this.props;
    
    return (
      <div
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          ...style }}
        onScroll={throttle(this.handleScroll, throttleTime)}
      >
        <ReactList
          ref={ref => this.reactList = ref}
          length={items.length}
          itemRenderer={itemRenderer}
          pageSize={pageSize}
        />
        {isFetching ?
          <p className={styles.tip}>加载中...</p> :
          isNoMoreData ?
            <p className={styles.tip}>没有数据了</p> :
            undefined}
      </div>
    );
  }
}
