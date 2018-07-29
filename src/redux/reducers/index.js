import { combineReducers } from 'redux';
import { RECEIVE_POSTS, SET_NAV_INFO, SET_HEIGHT, SET_FETCH } from '../actions';

const posts = (state = {
  items: [],
  page: 1,
  limit: 10,
  isClear: true,
}, action) => {
  const {
    itemInfo,
    type,
  } = action;
  switch (type) {
  case RECEIVE_POSTS:
    const { isClear, items } = itemInfo;
    const baseState = {
      ...state,
      ...action.itemInfo,
    };
    if (isClear) return baseState;
    return {
      ...baseState,
      items: [ ...state.items, ...items ],
    };
  default:
    return state;
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

const globalInfo = (state = {
  height: 0,
  isFetching: false,
}, { type, globalInfo }) => {
  switch (type) {
  case SET_HEIGHT:
    return {
      ...state,
      height: globalInfo.height,
    };
  case SET_FETCH:
    return {
      ...state,
      isFetching: globalInfo.isFetching,
    };
  default:
    return state;
  }
};


const reducer = combineReducers({
  posts,
  subTabInfo,
  globalInfo,
});

export default reducer;
