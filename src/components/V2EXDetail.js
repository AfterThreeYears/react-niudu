import { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { fetchPosts } from '../redux/actions';

class V2EXDetail extends Component {
  // static propTypes = {
  //   posts: PropTypes.object.isRequired,
  //   fetchPosts: PropTypes.func.isRequired,
  // };
  componentDidMount() {
    // this.props.fetchPosts({listType: 'v2ex', field: 'all'});
  }
  render() {
    return (
      <div>
        V2EXDetail
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  fetchPosts,
})(V2EXDetail);
