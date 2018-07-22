import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import SwipeWrapper from '@/components/Swiper/SwipeWrapper';
import SwipeItem from '@/components/Swiper/SwipeItem';
import withRef from '@/components/Hoc/withRef';
import { fetchPosts, handleSetNavInfo } from '@/redux/actions';
import { getPropNumeric } from '@/utils/styles';

import styles from '@/components/SubSideBar/SubSideBar.css';

class SubSideBar extends Component {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    tabs: PropTypes.array.isRequired,
    currentNav: PropTypes.string.isRequired,
    currentTab: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      swiperViewWidth: 0,
    };
  }
  componentDidMount() {
    this.setState({
      swiperViewWidth: getPropNumeric(this.swiperWrap, 'width'),
    });
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
    if (isChangedNav) {
      this.setState({ selectedIndex: 0 }, () => {
        this.SwipeWrapper && this.SwipeWrapper.init();
      });
    }
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
                      {title}-{index}
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

function mapStateToProps({ subTabInfo }) {
  return subTabInfo;
}

export default connect(mapStateToProps, {
  fetchPosts,
  handleSetNavInfo,
})((withRef(SubSideBar)));
