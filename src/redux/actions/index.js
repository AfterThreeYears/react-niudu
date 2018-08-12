import axios from 'axios';
import { dateDiff } from '@/utils/time';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SET_NAV_INFO = 'SET_NAV_INFO';
export const SET_HEIGHT = 'SET_HEIGHT';
export const SET_FETCH = 'SET_FETCH';
export const SET_NOMORE = 'SET_NOMORE';
export const RECEIVE_CNODE_REPLYS = 'RECEIVE_CNODE_REPLYS';
export const RECEIVE_V2EX_REPLYS = 'RECEIVE_V2EX_REPLYS';
export const RECEIVE_V2EX_ISNOMORE = 'RECEIVE_V2EX_ISNOMORE';
export const RECOVER_V2EX = 'RECOVER_V2EX';
export const RECOVER_CNODE = 'RECOVER_CNODE';

export const fetchPosts = ({ currentNav, currentTab, page = 1, limit = 40, isClear = true }) => dispatch => {
  // 如果改变了类型，需要清空当前列表
  if (isClear) dispatch(receivePosts({ isClear, items: [] }));
  // show loading
  dispatch(handleSetFetch(true));
  let axiosPromise = Promise.resolve();
  if ( currentNav === 'v2ex' ) {
    axiosPromise = axios.get(`${currentNav}/list/${currentTab}`);
  } else if ( currentNav === 'cnode' ) {
    const params = {
      tab: currentTab,
      page,
      limit,
    };
    axiosPromise = axios.get('https://cnodejs.org/api/v1/topics', { params })
      .then(items => {
        dispatch(handleSetNoMore(items.length < limit));
        return items;
      });
  }
  return axiosPromise
    .then(items => dispatch(receivePosts({ items, page, limit, isClear })))
    .then(() => dispatch(handleSetFetch(false)));
};

export const receivePosts = (itemInfo) => ({
  type: RECEIVE_POSTS,
  itemInfo,
});

export const handleSetNavInfo = (navInfo) => dispatch => {
  dispatch({
    type: SET_NAV_INFO,
    navInfo,
  });
};

export const handleSetGlobalInfo = (globalInfo) => dispatch => {
  dispatch({
    type: SET_HEIGHT,
    globalInfo,
  });
};

export const handleSetFetch = (isFetching) => ({
  type: SET_FETCH,
  globalInfo: { isFetching },
});

export const handleSetNoMore = (isNoMoreData) => ({
  type: SET_NOMORE,
  globalInfo: { isNoMoreData },
});

export const handleSetCNodeDetail = (res) => ({ type: RECEIVE_CNODE_REPLYS, res });

export const handleRecoverCNodeDetail = () => ({ type: RECOVER_CNODE });

export const handleFetchCNodeDetail = ({ id }) => {
  return async dispatch => {
    dispatch(handleSetFetch(true));
    let res;
    try {
      res = await axios.get(`https://cnodejs.org/api/v1/topic/${id}`);
      res.createStr = dateDiff(new Date(res.create_at));
      (res.replies || []).forEach((item) => {
        item.createStr = dateDiff(new Date(item.create_at));
      });
    } catch (error) {
      console.error('error', error); // eslint-disable-line
      res = { message: error.message };
    }
    dispatch(handleSetFetch(false));
    dispatch(handleSetCNodeDetail(res));
  };
};

export const handleSetV2EXDetail = (data) => ({ type: RECEIVE_V2EX_REPLYS, data });

export const handleRecoverV2EXDetail = () => ({ type: RECOVER_V2EX });

export const handleSetV2EXisNoMore = (data) => ({ type: RECEIVE_V2EX_ISNOMORE, data });

export const handleFetchV2EXDetail = ({ id, pageIndex }) => {
  return async dispatch => {
    dispatch(handleSetFetch(true));
    dispatch(handleSetV2EXisNoMore(true));
    let res;
    try {
      res = await axios.get(`/v2ex/detail/${id}?pageIndex=${pageIndex}`);
    } catch (error) {
      console.error('error', error); // eslint-disable-line
      res = { message: error.message, data: { isNoMoreData: true } };
    }
    dispatch(handleSetFetch(false));
    dispatch(handleSetV2EXDetail({ res, pageIndex }));
  };
};
