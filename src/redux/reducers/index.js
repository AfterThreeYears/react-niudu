import { combineReducers } from 'redux';
import {
  SET_NOMORE,
  RECEIVE_POSTS,
  SET_NAV_INFO,
  SET_HEIGHT,
  SET_FETCH,
  RECEIVE_REPLYS,
} from '../actions';

const posts = (state = {
  items: [],
  page: 1,
  limit: 10,
  isClear: true,
}, action) => {
  const { itemInfo, type } = action;
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
  isNoMoreData: false,
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
  case SET_NOMORE:
    return {
      ...state,
      isNoMoreData: globalInfo.isNoMoreData,
    };
  default:
    return state;
  }
};

const cnodeDetail = (state = {}, action) => {
  const { res, type } = action;
  switch (type) {
  case RECEIVE_REPLYS:
    return res;
  default:
    return state;
  }
};


const reducer = combineReducers({
  posts,
  subTabInfo,
  globalInfo,
  cnodeDetail,
});

export default reducer;
