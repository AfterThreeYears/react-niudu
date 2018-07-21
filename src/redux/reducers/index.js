import { combineReducers } from 'redux';
import { REQUEST_POSTS, RECEIVE_POSTS, SET_NAV_INFO } from '../actions';

const posts = (state = {
  isFetching: false,
  items: [],
  page: 1,
  limit: 10,
  isClear: true
}, action) => {
  const {
    itemInfo,
    type,
  } = action;
  switch (type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_POSTS:
      const { isClear, items } = itemInfo;
      const baseState = {
        ...state,
        ...action.itemInfo,
        isFetching: false,
      };
      if ( isClear ) return baseState;
      return {
        ...baseState,
        items: [...state.items, ...items],
      };
    default:
      return state
  }
};

const subTabInfo = (state = {
  currentNav: '',
  currentTab: '',
  tabs: [],
}, { type, navInfo }) => {
  if (type === SET_NAV_INFO) return {
    ...state,
    ...navInfo,
  };
  return state; 
};


const reducer = combineReducers({
  posts,
  subTabInfo,
});

export default reducer;
