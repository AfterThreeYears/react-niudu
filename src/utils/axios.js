import axios from 'axios';
axios.defaults.baseURL = 'https://api.wbb1.top';

let count = 0;
let loading = null;

// 多个请求之间间隔少于300ms，不中断loading
const handleResetLoading = (() => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (loading) loading.hide();
      count = 0;
      loading = null;
    }, 300);
  };
})();

const handleCheckLoadingStatus = () => {
  count -= 1;
  if (count <= 0) {
    handleResetLoading();
  }
};

const handleGeneratorLoading = () => {
  return;
  if (!loading) loading = null;
  count += 1;
};

const getResponseSuccessInterceptor = (errorCallback) => (res) => {
  // config 参数
  // custom 当后端返回的数据为success为false，设置custom: true,可以使这个数据进行特定处理
  // useLoad true 为展示loading
  // skip true 为返回所有response
  const {config} = res;
  if (config.useLoad) {
    handleCheckLoadingStatus();
  }
  if (!res.data.success && !config.custom) {
    const msg = `${res.data.errorCode}:${res.data.errorMSG}`;
    errorCallback(msg);
    throw res.data.errorMSG;
  }
  if (config.skip) return res;
  return res.data.data;
};
const getResponseErrorInterceptor = (errorCallback) => (error) => {
  handleCheckLoadingStatus();
  errorCallback('506:系统开了个小差!');
  return Promise.reject();
};

const getRequestSuccessInterceptor = (config) => {
  const {useLoad} = config;
  if (useLoad) handleGeneratorLoading();
  return config;
};

const getRequesteErrorInterceptor = (error) => {
  handleResetLoading();
  return Promise.reject(error);
};

const errorHandler = (error) => {
  console.error(error);
};

axios.interceptors.response.use(
  getResponseSuccessInterceptor(errorHandler),
  getResponseErrorInterceptor(errorHandler),
);

axios.interceptors.request.use(
  getRequestSuccessInterceptor,
  getRequesteErrorInterceptor
);
