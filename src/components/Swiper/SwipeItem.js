import React, { Component } from 'react';
import '@/components/Swiper/SwipeItem.css';

class SwipeItem extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className={'swipe-item'}>
        <span>{this.props.children}</span>
      </div>
    );
  }
}

export default SwipeItem;
