import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import LazyLoad from 'react-lazy-load';
import { handleFetchV2EXDetail } from '@/redux/actions/index';
import ReactPullList from '@/components/ReactPullList/ReactPullList';
import MarkDown from '@/components/MarkDown/MarkDown'; 

import styles from './V2EXDetail.css';

@connect(
  ({ globalInfo, v2exDetail }) => ({ globalInfo, v2exDetail }),
  { handleFetchV2EXDetail },
)
export default class V2EXDetail extends Component {
  componentDidMount() {
    this.handleLoaderMore(1);
  }

  itemRenderer = (index, key) => {
    const { replier, content } = this.props.v2exDetail.res;
    const { title, lastReply, markdown } = content;
    if (index === 0) {
      return (<section key={key}>
        <h2 className={styles['v2exDetail-title']}>{title}</h2>
        <hr />
        <MarkDown content={lastReply} />
        <MarkDown content={markdown} />
        <hr />
      </section>);
    } 
    const reply = replier[index - 1];
    const { avatar, dark, small, replyContent } = reply;
    return (
      <div
        key={key}
        className={`${styles['v2exDetail-list']} clearfix`}
      >
        <div className={styles['v2exDetail-headPic-wrap']}>
          <LazyLoad offsetTop={200} height={'0.8rem'}>
            <img
              src={avatar}
              alt={avatar}
              className={styles['v2exDetail-headPic']}
            />
          </LazyLoad>
        </div>
        <div className={styles['v2exDetail-detail']}>
          <div className={styles['v2exDetail-detail-left']}>
            <p className={styles['v2exDetail-info']}>{dark} {small}</p>
            <MarkDown classnames={ styles['v2exDetail-replyContent'] } content={replyContent} />
          </div>
          <div className={styles['v2exDetail-detail-right']}>
            <span>{index}楼</span>
          </div>
        </div>
      </div>);
  }

  handleLoaderMore = (pageIndex) => {
    const { handleFetchV2EXDetail, match, v2exDetail } = this.props;
    return handleFetchV2EXDetail({
      id: match.params.id,
      pageIndex: pageIndex || v2exDetail.pageIndex + 1,
    });
  }

  render() {
    const { v2exDetail, globalInfo } = this.props;
    const { message, res: { replier, isNoMoreData } } = v2exDetail;
    const { isFetching } = globalInfo;
    if (isEmpty(replier)) return (<p>加载中...</p>);
    if (message) return (<p>异常: {message}</p>);
    return (
      <ReactPullList
        ref={ref => this.reactPullList = ref}
        itemRenderer={this.itemRenderer}
        items={replier}
        handleLoaderMore={this.handleLoaderMore}
        isNoMoreData={isNoMoreData}
        isFetching={isFetching}
        style={{ height: `${window.innerHeight}px`, padding: '0.3rem' }}
      />
    );
  }
}
