import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from '@/redux/actions';

class CNode extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    fetchPosts: PropTypes.func.isRequired,
  };
  static defaultProps = {
    posts: {},
    fetchPosts: () => {},
  }
  handleMore = () => {
    console.log(this);
    const {
      currentNav,
      currentTab,
    } = this.props.subTabInfo;
    const {
      page,
    } = this.props.posts;
    
    this.props.fetchPosts({
      currentNav,
      currentTab,
      page: page + 1,
      isClear: false,
    });
  }
  render() {
    const {isFetching, items} = this.props.posts;
    return (
      <div>
        {
          isFetching ? <h1>cnode加载中</h1> :
          <ul>{items.map((item, index) => (<li key={index}>{index}-{item.title}</li>))}</ul>
        }
        <button onClick={this.handleMore}>click</button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProp) {
  return state;
}

export default connect(mapStateToProps, {
  fetchPosts,
})(CNode);
