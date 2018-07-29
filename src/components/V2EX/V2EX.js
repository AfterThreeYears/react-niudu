import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactPullList from '@/components/ReactPullList/ReactPullList';

import styles from './V2EX.css';

class V2EX extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
  };
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
  itemRenderer = (index) => {
    const items = this.convertField();
    const item = items[index];
    return (
      <div className={styles.List} key={index}>
        <Link to={`/v2ex/detail/${item.id}`}>
          <section className={styles['detail-imgWrap']}>
            <img src={item.avatar} className={styles['detail-info-img']} />
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
        </Link>
      </div>
    );
  };
  convertField = () => {
    return this.props.posts.items;
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

export default connect(mapStateToProps)(V2EX);
