import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@/components/Swiper/SwipeWrapper.css';

class SwipeWrapper extends Component {
  componentDidMount() {
    console.log(this.swipe.offsetWidth);
  }
  render() {
    return (
      <div className={'swiper-container'}>
        <div className={'swipe-wrap'} ref={ref => this.swipe = ref}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SwipeWrapper;
