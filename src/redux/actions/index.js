import axios from 'axios';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SET_NAV_INFO = 'SET_NAV_INFO';

export const requestPosts = () => ({
  type: REQUEST_POSTS,
});

export const fetchPosts = ({currentNav, currentTab, page = 1, limit = 10, isClear = true}) => dispatch => {
  dispatch(requestPosts())
  let axiosPromise = Promise.resolve();
  if ( currentNav === 'v2ex' ) {
    axiosPromise = axios.get(`${currentNav}/list/${currentTab}`);
  } else if ( currentNav === 'cnode' ) {
    const params = {
      tab: currentTab,
      page,
      limit,
    };
    axiosPromise = axios.get('https://cnodejs.org/api/v1/topics', params);
  }
  return axiosPromise.then(items => dispatch(receivePosts({items, page, limit, isClear})));
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
