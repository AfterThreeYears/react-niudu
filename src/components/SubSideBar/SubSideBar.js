import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import qs from 'qs';
import SwipeWrapper from '@/components/Swiper/SwipeWrapper';
import SwipeItem from '@/components/Swiper/SwipeItem';
import withRef from '@/components/Hoc/withRef';
import { fetchPosts, handleSetNavInfo } from '@/redux/actions';
import { getPropNumeric } from '@/utils/styles';

import styles from '@/components/SubSideBar/SubSideBar.css';

@connect(({ subTabInfo }) => subTabInfo, {
  fetchPosts,
  handleSetNavInfo,
})
@withRef
export default class SubSideBar extends Component {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    tabs: PropTypes.array.isRequired,
    currentNav: PropTypes.string.isRequired,
    currentTab: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    const { tabIndex } = qs.parse(this.props.location.search.substr(1));
    this.state = {
      selectedIndex: Number(tabIndex) || 0,
      swiperViewWidth: 0,
    };
  }
  componentDidMount() {
    this.setState({
      swiperViewWidth: getPropNumeric(this.swiperWrap, 'width'),
    }, this.handleInitSwipe);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const oldNav = this.props.currentNav;
    const oldTab = this.props.currentTab;
    const { currentNav, currentTab } = nextProps;
    if ( oldNav === currentNav && oldTab === currentTab ) return;
    const isChangedNav = oldNav !== currentNav;
    // 导航不同或者tab不同都需要去清空列表
    const isClear = isChangedNav || oldTab !== currentTab;
    this.props.fetchPosts({ currentNav, currentTab, isClear });
    const { tabIndex } = qs.parse(this.props.location.search.substr(1));
    if (isChangedNav) {
      this.setState({ selectedIndex: isChangedNav ? 0 : Number(tabIndex) || 0 }, this.handleInitSwipe);
    }
  }
  handleInitSwipe() {
    this.SwipeWrapper && this.SwipeWrapper.init();
  }
  handleClick(e, item, index) {
    const {
      tabs,
      currentNav,
    } = this.props;
    this.props.handleSetNavInfo({
      currentNav,
      currentTab: item.tab,
      tabs,
    });
    this.setState({
      selectedIndex: index,
    }, () => {
      const search = qs.stringify({ tabIndex: index });
      this.props.history.push(`${this.props.location.pathname}?${search}`);
    });
  }
  render() {
    const { selectedIndex, swiperViewWidth } = this.state;
    const { tabs } = this.props;
    return (
      <div className={styles.wrap} ref={ref => this.swiperWrap = ref}>
        {
          tabs.length ?
            <SwipeWrapper
              index={selectedIndex}
              isShowCursor={false}
              swiperViewWidth={swiperViewWidth}
              ref={ref => this.SwipeWrapper = ref}
            >
              {tabs.map((item, index) => {
                const { title } = item;
                return (
                  <SwipeItem key={index}>
                    <span
                      onClick={e => this.handleClick(e, item, index)}
                      className={classnames({
                        [styles.curIndex]: selectedIndex === index,
                        [styles.item]: true,
                      })}
                    >
                      {title}
                    </span>
                  </SwipeItem>
                );
              })}
            </SwipeWrapper> : undefined
        }
      </div>
    );
  }
}
