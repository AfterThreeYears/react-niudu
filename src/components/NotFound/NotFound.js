import React, { Component } from 'react';

export default class NoFund extends Component {
  render() {
    const list = Array.from(Array(1000));
    return (
      <div>
        {list.map((item, index) => {
          return (<p key={index}>{index}</p>);
        })}
      </div>
    );
  }
}
