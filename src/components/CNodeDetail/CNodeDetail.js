import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { handleFetchCNodeDetail } from '@/redux/actions/index';
import { cnodeMap } from '@/config/nav';

import styles from './CNodeDetail.css';

@connect(({ cnodeDetail }) => ({ cnodeDetail }), { handleFetchCNodeDetail })
export default class CNodeDetail extends Component {
  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = () => {
    this.props.handleFetchCNodeDetail({ id: this.props.match.params.id });
  }

  renderReplys = (replys) => {
    return (replys || []).map((reply, index) => {
      const { author, content, createStr } = reply;
      const { avatar_url, loginname } = author;
      const floor = index + 1;
      return (
        <li
          key={index}
          className={styles['CNodeDetail-replyList']}
        >
          <div className={styles['CNodeDetail-headPic-wrap']}>
            <img
              src={avatar_url}
              alt={avatar_url}
              className={styles['CNodeDetail-headPic']}
            />
          </div>
          <section className={styles['CNodeDetail-section']}>
            <div className={styles['CNodeDetail-section-content']}>
              <p className={styles['CNodeDetail-loginname']}>{loginname}</p>
              <section
                className={'markdown-body'}
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <span>{createStr}</span>
            </div>
            <p className={styles['CNodeDetailFloor']}>{floor}楼</p>
          </section>
        </li>);
    });
  }

  render() {
    const { cnodeDetail } = this.props;
    const {
      message,
      title,
      createStr,
      author,
      visit_count,
      tab,
      replies,
      content,
    } = cnodeDetail;
    if (isEmpty(cnodeDetail)) return (<p>加载中...</p>);
    if (message) return (<p>异常: {message}</p>);
    const { loginname } = author;
    return (
      <div className={styles.CNodeDetail}>
        <h2 className={styles['CNodeDetail-title']}>{title}</h2>
        <div className={styles['CNodeDetail-info']}>
          <span>发布于 {createStr}</span>
          <span>作者 {loginname}</span>
          <span>{visit_count}次浏览</span>
          <span>来自{cnodeMap[tab]}</span>
        </div>
        <p className={styles['CNodeDetail-replies']}>{replies.length}回复</p>
        <section
          className={styles['CNodeDetail-content'], 'markdown-body'}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <ul>{this.renderReplys(replies)}</ul>
      </div>
    );
  }
}
