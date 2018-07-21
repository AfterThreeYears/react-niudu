import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import SwipeWrapper from '@/components/Swiper/SwipeWrapper';
import SwipeItem from '@/components/Swiper/SwipeItem';
import { fetchPosts, handleSetNavInfo } from '@/redux/actions';
import { getPropNumeric } from '@/utils/styles';

import styles from '@/components/SubSideBar/SubSideBar.css';

class SubSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      swiperViewWidth: 360,
    };
  }
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    tabs: PropTypes.array.isRequired,
    currentNav: PropTypes.string.isRequired,
    currentTab: PropTypes.string.isRequired
  };
  componentDidMount() {
    this.setState({
      swiperViewWidth: getPropNumeric(this.swiperWrap, 'width'),
    });
  }
  componentWillReceiveProps(nextProps) {
    const oldNav = this.props.currentNav;
    const oldTab = this.props.currentTab;
    const { currentNav, currentTab } = nextProps;
    if ( oldNav === currentNav && oldTab === currentTab ) return;
    const isClear = oldNav !== currentNav;
    this.props.fetchPosts({currentNav, currentTab, isClear});
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
    })
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
          >
            {tabs.map((item, index) => {
              const {title} = item;
              return (
                <SwipeItem key={index}>
                  <span
                    onClick={e => this.handleClick(e, item, index)}
                    className={classnames({
                      [styles.curIndex]: selectedIndex === index,
                      [styles.item]: true
                    })}
                  >
                    {title}
                  </span>
                </SwipeItem>
              )
            })}
          </SwipeWrapper> : undefined
        }
      </div>
    );
  }
}

function mapStateToProps({ subTabInfo }, ownProp) {
  return subTabInfo;
}

export default connect(mapStateToProps, {
  fetchPosts,
  handleSetNavInfo,
})(SubSideBar);
