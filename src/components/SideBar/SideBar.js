import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import SwipeWrapper from '@/components/Swiper/SwipeWrapper';
import SwipeItem from '@/components/Swiper/SwipeItem';
import navs from '@/config/nav';
import {fetchPosts} from '@/redux/actions';

import styles from '@/components/SideBar/SideBar.css';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      curItem: navs[0],
    };
  }
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
  };
  componentDidMount() {
    console.log(this.state.curItem);
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
    return (
      <div className={styles.wrap}>
        <SwipeWrapper
          index={selectedIndex}
        >
          {navs.map((item, index) => {
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
    posts: state.posts.items,
    isFetching: state.posts.isFetching,
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
})(SideBar);
