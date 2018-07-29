import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ReactPullList from '@/components/ReactPullList/ReactPullList';
import { fetchPosts } from '@/redux/actions';
import { dateDiff } from '@/utils/time';
import { cnodeTag } from '@/utils/tag';

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
    const items = this.convertField();
    const item = items[index];
    return (
      <div className={styles.list} key={key}>
        <Link to={`/cnode/detail/${item.id}`}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.detail}>
            <div className={styles['detail-info']}>
              <section className={styles['detail-imgWrap']}>
                <img src={item.author.avatar_url} className={styles['detail-info-img']} />
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
        </Link>
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

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  fetchPosts,
})(CNode);
