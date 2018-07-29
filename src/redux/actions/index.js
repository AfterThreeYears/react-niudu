import axios from 'axios';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SET_NAV_INFO = 'SET_NAV_INFO';
export const SET_HEIGHT = 'SET_HEIGHT';
export const SET_FETCH = 'SET_FETCH';

export const fetchPosts = ({ currentNav, currentTab, page = 1, limit = 40, isClear = true }) => dispatch => {
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
    axiosPromise = axios.get('https://cnodejs.org/api/v1/topics', { params });
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
