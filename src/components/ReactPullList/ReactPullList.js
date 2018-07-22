import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';
import { throttle } from 'lodash';

// import styles from './ReactPullList.css';

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
    handleLoaderMore: PropTypes.func.isRequired,
    // 容器的样式
    style: PropTypes.object,
  };
  static defaultProps = {
    throttleTime: 100,
    range: 5,
    style: {},
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    this.handleWrapScroll = throttle(this.handleScroll, this.props.throttleTime);
  }
  handleScrollTo(index) {
    this.reactList.scrollTo(index);
  }
  handleScroll = () => {
    const { range, handleLoaderMore, items } = this.props;
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
    const { itemRenderer, items, style } = this.props;
    
    return (
      <div style={{ overflowY: 'auto', ...style }} onScroll={this.handleWrapScroll}>
        <ReactList
          ref={ref => this.reactList = ref}
          length={items.length}
          itemRenderer={itemRenderer}
        />
      </div>
    );
  }
}
