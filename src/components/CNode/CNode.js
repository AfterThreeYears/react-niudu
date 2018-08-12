import React, { Component } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import ReactPullList from '@/components/ReactPullList/ReactPullList';
import { handleSetCNodeDetail, fetchPosts } from '@/redux/actions';
import { dateDiff } from '@/utils/time';
import { cnodeTag } from '@/utils/tag';

import styles from './CNode.css';

@connect(state => state, {
  fetchPosts,
  handleSetCNodeDetail,
})
@withRouter
export default class CNode extends Component {
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
  componentDidUpdate() {
    const search = qs.parse(this.props.location.search.substr(1));
    this.reactPullList.handleScrollTo(search.index);
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
  handleJump = (id) => {
    const index = this.reactPullList.reactList.getVisibleRange()[0];
    this.props.handleSetCNodeDetail({});
    this.props.history.push(`/cnode?index=${index}`);
    this.props.history.push(`/cnode/detail/${id}`);
  }
  itemRenderer = (index, key) => {
    const items = this.convertField();
    const item = items[index];
    return (
      <div className={styles.list} key={key}>
        <a onClick={() => this.handleJump(item.id)}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.detail}>
            <div className={styles['detail-info']}>
              <section className={styles['detail-imgWrap']}>
                <LazyLoad offsetTop={200} height={'1rem'}>
                  <img src={item.author.avatar_url} className={styles['detail-info-img']} />
                </LazyLoad>
              </section>
              <p className={classnames({
                'text-ellipsis': true,
                [styles['detail-loginname']]: true,
              })}>{item.author.loginname}</p>
              <p className={classnames({
                'text-ellipsis': true,
                [styles['detail-last_reply_at']]: true,
              })}>{item.last_reply_at_str}</p>
            </div>
            <div className={styles['detail-params']}>
              <span className={styles.badge}>{item.tabStr}</span>
              <div className={styles['detail-count']}>
                <span className={styles['detail-text']}>
                  <span className={styles['detail-reply_count']}>{item.reply_count}</span>
                  <span>/{item.visit_count}</span>
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  };
  convertField = () => this.props.posts.items.map((topic) => ({
    ...topic,
    last_reply_at_str: dateDiff(+new Date(topic.last_reply_at)),
    tabStr: cnodeTag(topic),
  }))
  render() {
    const { items } = this.props.posts;
    const { height, isNoMoreData, isFetching } = this.props.globalInfo;
    return (
      <ReactPullList
        ref={ref => this.reactPullList = ref}
        itemRenderer={this.itemRenderer}
        items={items}
        handleLoaderMore={this.handleLoaderMore}
        isNoMoreData={isNoMoreData}
        isFetching={isFetching}
        style={{ height: `${height}px` }}
      />
    );
  }
}
