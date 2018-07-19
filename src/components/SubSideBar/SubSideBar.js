import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import SwipeWrapper from '@/components/Swiper/SwipeWrapper';
import SwipeItem from '@/components/Swiper/SwipeItem';
import {fetchPosts} from '@/redux/actions';
import styles from '@/components/SubSideBar/SubSideBar.css';

class SubSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      curItem: this.props.tabs[0],
    };
  }
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.fetchPosts({listType: 'v2ex', field: 'all'});
  }
  handleClick(e, item, index) {
    this.setState({
      curItem: item,
      selectedIndex: index,
    }, () => {
      this.props.fetchPosts({listType: 'v2ex', field: 'all'});
    });
  }
  render() {
    const { selectedIndex } = this.state;
    const { tabs } = this.props;
    return (
      <div className={styles.wrap}>
        <SwipeWrapper
          index={selectedIndex}
          isShowCursor={false}
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
        </SwipeWrapper>
      </div>
    );
  }
}

function mapStateToProps(state, ownProp) {
  return {
    tabs: state.subTabs.tabs,
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
})(SubSideBar);
