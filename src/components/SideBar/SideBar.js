import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
// import PropTypes from 'prop-types';
import classnames from 'classnames';
import SwipeWrapper from '@/components/Swiper/SwipeWrapper';
import SwipeItem from '@/components/Swiper/SwipeItem';
import withRef from '@/components/Hoc/withRef';
import navs, { pathMap } from '@/config/nav';
import { handleSetNavInfo } from '@/redux/actions';

import styles from '@/components/SideBar/SideBar.css';

class SideBar extends Component {
  static propTypes = {
    
  };
  
  static defaultProps = {
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: pathMap[this.props.location.pathname],
    };
  }
  
  componentDidMount() {
    const { tabs, url } = navs[this.state.selectedIndex];
    this.props.handleSetNavInfo({
      currentNav: url,
      currentTab: tabs[0].tab,
      tabs: tabs,
    });
  }
  handleClick(e, item, index) {
    const {
      tabs,
      url,
    } = item;
    this.props.handleSetNavInfo({
      currentNav: url,
      currentTab: tabs[0].tab,
      tabs: tabs,
    });
    this.setState({
      selectedIndex: index,
    });
  }
  render() {
    const { selectedIndex } = this.state;
    return (
      <div className={styles.wrap} ref={ref => this.wrap = ref}>
        <SwipeWrapper
          index={selectedIndex}
        >
          {navs.map((item, index) => {
            const { title, url } = item;
            return (
              <SwipeItem key={index}>
                <Link
                  to={url}
                  onClick={e => this.handleClick(e, item, index)}
                  className={classnames({
                    [styles.curIndex]: selectedIndex === index,
                    [styles.item]: true,
                  })}
                >
                  {title}
                </Link>
              </SwipeItem>
            );
          })}
        </SwipeWrapper>
      </div>
    );
  }
}

export default withRouter(connect(null, {
  handleSetNavInfo,
})(withRef(SideBar)));
