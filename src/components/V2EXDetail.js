import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {fetchPosts} from '../redux/actions';

class V2EXDetail extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    fetchPosts: PropTypes.func.isRequired,
  };
  componentDidMount() {
    // this.props.fetchPosts({listType: 'v2ex', field: 'all'});
  }
  render() {
    const {isFetching, posts} = this.props;
    return (
      <div>
        V2EXDetail
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
})(V2EXDetail);
