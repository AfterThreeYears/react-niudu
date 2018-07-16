import React, { Component } from 'react';
import '@/components/Swiper/SwipeItem.css';

class SwipeItem extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className={'swiper-slide'}>
        {this.props.children}
      </div>
    );
  }
}

export default SwipeItem;
