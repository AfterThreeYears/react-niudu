import axios from 'axios';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const requestPosts = () => ({
  type: REQUEST_POSTS,
});

export const fetchPosts = ({listType, field}) => dispatch => {
  dispatch(requestPosts())
  return axios.get(`${listType}/list/${field}`)
    .then(json => {
      return dispatch(receivePosts(listType, json));
    });
}

export const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  posts: json,
});
