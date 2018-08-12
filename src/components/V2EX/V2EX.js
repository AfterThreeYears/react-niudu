import React, { Component } from 'react';
import qs from 'qs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import LazyLoad from 'react-lazy-load';
import ReactPullList from '@/components/ReactPullList/ReactPullList';
import { handleRecoverV2EXDetail } from '@/redux/actions/index';

import styles from './V2EX.css';

@connect(state => state, { handleRecoverV2EXDetail })
export default class V2EX extends Component {
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
    const { index } = qs.parse(this.props.location.search.substr(1));
    if (isUndefined(index)) return;
    this.reactPullList.handleScrollTo(index);
    // 跳转以后需要清除index, 防止下一次还是回到这个位置
    this.props.history.push('/v2ex');
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
    this.props.handleRecoverV2EXDetail();
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
