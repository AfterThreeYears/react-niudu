import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPullList from '@/components/ReactPullList/ReactPullList';
import { fetchPosts } from '@/redux/actions';

import styles from './CNode.css';

class CNode extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    fetchPosts: PropTypes.func.isRequired,
  };
  static defaultProps = {
    posts: {},
    fetchPosts: () => {},
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { subTabInfo } = this.props;
    const oldNav = subTabInfo.currentNav;
    const oldTab = subTabInfo.currentTab;
    const { currentNav, currentTab } = nextProps.subTabInfo;
    if ( oldNav === currentNav && oldTab === currentTab ) return;
    // 导航不同或者tab不同都需要去清空列表
    const isClear = oldNav !== currentNav || oldTab !== currentTab;
    if (isClear) this.reactPullList.handleScrollTo(0);
  }
  handleLoaderMore = () => {
    const {
      currentNav,
      currentTab,
    } = this.props.subTabInfo;
    const {
      page,
    } = this.props.posts;
    return this.props.fetchPosts({
      currentNav,
      currentTab,
      page: page + 1,
      isClear: false,
    });
  }
  itemRenderer = (index, key) => {
    const { items } = this.props.posts;
    return (
      <div className={styles.item} key={key}>{key}-{items[index].title}</div>
    );
  };
  render() {
    const { items } = this.props.posts;
    const { height } = this.props.globalInfo;
    return (
      <ReactPullList
        ref={ref => this.reactPullList = ref}
        itemRenderer={this.itemRenderer}
        items={items}
        handleLoaderMore={this.handleLoaderMore}
        style={{ height: `${height}px` }}
      />
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  fetchPosts,
})(CNode);
