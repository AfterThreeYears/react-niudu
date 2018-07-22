import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class V2EX extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
  };
  render() {
    const { isFetching, items } = this.props.posts;
    return (
      <div>
        {
          isFetching ? <h1>加载中</h1> :
            <ul>{items.map((item, index) => (<li key={index}>{item.title}</li>))}</ul>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(V2EX);
