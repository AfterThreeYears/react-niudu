import React, { Component } from 'react';
import '@/components/Swiper/SwipeItem.css';

class SwipeItem extends Component {
  render() {
    return (
      <div className={'swipe-item'}>
        {this.props.children}
      </div>
    );
  }
}

export default SwipeItem;
