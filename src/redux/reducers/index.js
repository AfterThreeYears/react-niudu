import { combineReducers } from 'redux';
import { REQUEST_POSTS, RECEIVE_POSTS, SET_TABS } from '../actions';

const posts = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
      }
    default:
      return state
  }
};

const subTabs = (state = {
  tabs: [],
}, action) => {
  if (action.type === SET_TABS) return {
    ...state,
    tabs: action.tabs,
  };
  return state; 
};


const reducer = combineReducers({
  posts,
  subTabs,
});

export default reducer;
