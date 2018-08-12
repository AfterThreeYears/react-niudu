import { combineReducers } from 'redux';
import {
  SET_NOMORE,
  RECEIVE_POSTS,
  SET_NAV_INFO,
  SET_HEIGHT,
  SET_FETCH,
  RECEIVE_CNODE_REPLYS,
  RECOVER_CNODE,
  RECEIVE_V2EX_REPLYS,
  RECEIVE_V2EX_ISNOMORE,
  RECOVER_V2EX,
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
  case RECEIVE_CNODE_REPLYS:
    return res;
  case RECOVER_CNODE:
    return {};
  default:
    return state;
  }
};

const v2exDetail = (state = { res: { replier: [], isNoMoreData: false }, pageIndex: 1 }, action) => {
  const { data = { res: { replier: [], isNoMoreData: false }, pageIndex: 1 }, type } = action;
  switch (type) {
  case RECEIVE_V2EX_REPLYS:
    return {
      ...data,
      res: {
        ...data.res,
        replier: [ ...(state.res.replier || []), ...data.res.replier ],
      },
    };
  case RECOVER_V2EX:
    return data;
  case RECEIVE_V2EX_ISNOMORE:
    return {
      ...state,
      res: {
        ...state.res,
        isNoMoreData: data,
      },
    };
  default:
    return state;
  }
};


const reducer = combineReducers({
  posts,
  subTabInfo,
  globalInfo,
  cnodeDetail,
  v2exDetail,
});

export default reducer;
