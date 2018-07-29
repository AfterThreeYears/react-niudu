import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleSetNavInfo } from '@/redux/actions/index';

class V2EXDetail extends Component {
  handleJump = (path) => {
    this.props.history.push(path);
  }
  render() {
    return (
      <div>
        <a onClick={() => this.handleJump('/v2ex')}>v2ex</a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  handleSetNavInfo,
})(withRouter(V2EXDetail));
