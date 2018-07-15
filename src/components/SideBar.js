import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import {fetchPosts} from '../redux/actions';
import navs from '../config/nav'
import styles from './style.css'

class Navigation extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    fetchPosts: PropTypes.func.isRequired,
  };
  componentDidMount() {
    // this.props.fetchPosts({listType: 'v2ex', field: 'all'});
    //  new Swiper('.swiper-container', {
    //   slidesPerView: 3,
    //   spaceBetween: 30,
    //   freeMode: true,
    // });
    new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
    });
  }
  render() {
    // const {isFetching, posts} = this.props;
    return (
      <div className={'swiper-container'}>
        <div className={'swiper-wrapper'}>
          {navs.map(({title}, index) => (<div className={'swiper-slide'} key={index}>{title}</div>))}
        </div>
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
})(Navigation);
