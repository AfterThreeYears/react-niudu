import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LazyLoad from 'react-lazy-load';
import ReactPullList from '@/components/ReactPullList/ReactPullList';

import styles from './V2EX.css';

class V2EX extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
  };
  static defaultProps = {
    posts: {},
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
  itemRenderer = (index) => {
    const items = this.convertField();
    const item = items[index];
    return (
      <div className={styles.List} key={index}>
        <a onClick={() => this.handleJump(item.id)}>
          <section className={styles['detail-imgWrap']}>
            <LazyLoad offsetTop={200} height={'0.7rem'}>
              <img src={item.avatar} className={styles['detail-info-img']} />
            </LazyLoad>
          </section>
          <div className={styles['detail-info']}>
            <div className={styles['detail-tab-info']}>
              <p className={styles['detail-tab']}>{item.node}</p>
              <p className={classnames({
                'text-ellipsis': true,
                [styles['detail-loginname']]: true,
              })}>{item.author}</p>
            </div>
            <div className={styles['title-wrap']}>
              <h3 className={styles.title}>{item.title}</h3>
              <span className={styles.badge}>{item.count}</span>
            </div>
            <div className={styles['last_reply_at-wrap']}>
              <p className={classnames({
                'text-ellipsis': true,
                [styles['detail-last_reply_at']]: true,
              })}>{item.last_time}</p>
              <p>{item.last_reply}</p>
            </div>
          </div>
        </a>
      </div>
    );
  };
  convertField = () => {
    return this.props.posts.items;
  }
  handleJump = (id) => {
    const index = this.reactPullList.reactList.getVisibleRange()[0];
    this.props.history.push(`/v2ex?index=${index}`);
    this.props.history.push(`/v2ex/detail/${id}`);
  }
  render() {
    const { items } = this.props.posts;
    const { height, isFetching } = this.props.globalInfo;
    return (
      <ReactPullList
        ref={ref => this.reactPullList = ref}
        itemRenderer={this.itemRenderer}
        items={items}
        isNoMoreData={true}
        isFetching={isFetching}
        style={{ height: `${height}px` }}
      />
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(withRouter(V2EX));
