import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { handleSetNavInfo } from '@/redux/actions/index';

class CNodeDetail extends Component {
  handleJump = (path) => {
    this.props.history.push(path);
  }
  render() {
    return (
      <div>
        <Link to={'/cnode'}>cnode</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  handleSetNavInfo,
})(withRouter(CNodeDetail));
