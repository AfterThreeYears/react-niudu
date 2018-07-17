import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import SwipeWrapper from '@/components/Swiper/SwipeWrapper';
import SwipeItem from '@/components/Swiper/SwipeItem';
import navs from '@/config/nav';

import styles from '@/components/SideBar/SideBar.css';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }
  static propTypes = {
  };
  componentDidMount() {

  }
  handleClick(e, item, index) {
    console.log(e, item, index);
    this.setState({
      selectedIndex: index,
    });
  }
  render() {
    const { selectedIndex } = this.state;
    return (
      <SwipeWrapper
        index={selectedIndex}
      >
        {navs.map((item, index) => {
          const {title} = item;
          return (
            <SwipeItem key={index}>
              <div
                onClick={e => this.handleClick(e, item, index)}
                className={classnames({[styles.curIndex]: selectedIndex === index})}
              >
                {title}
              </div>
            </SwipeItem>
          )
        })}
      </SwipeWrapper>
    );
  }
}

function mapStateToProps(state, ownProp) {
  return {
    posts: state.posts.items,
    isFetching: state.posts.isFetching,
  };
}

export default connect(mapStateToProps, {
  // fetchPosts,
})(SideBar);
