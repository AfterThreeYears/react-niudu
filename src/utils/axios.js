import axios from 'axios';
axios.defaults.baseURL = 'https://api.wbb1.top';

const getResponseSuccessInterceptor = (errorCallback) => (res) => {
  // config 参数
  // custom 当后端返回的数据为success为false，设置custom: true,可以使这个数据进行特定处理
  // skip true 为返回所有response
  const { config } = res;
  if (!res.data.success && !config.custom) {
    const msg = `${res.data.errorCode}:${res.data.errorMSG}`;
    errorCallback(msg);
    throw res.data.errorMSG;
  }
  if (config.skip) return res;
  return res.data.data;
};
const getResponseErrorInterceptor = (errorCallback) => () => {
  errorCallback('506:系统开了个小差!');
  return Promise.reject();
};

const getRequestSuccessInterceptor = (config) => config;

const getRequesteErrorInterceptor = (error) => {
  return Promise.reject(error);
};

const errorHandler = (error) => {
  console.error(error); // eslint-disable-line
};

axios.interceptors.response.use(
  getResponseSuccessInterceptor(errorHandler),
  getResponseErrorInterceptor(errorHandler),
);

axios.interceptors.request.use(
  getRequestSuccessInterceptor,
  getRequesteErrorInterceptor,
);
