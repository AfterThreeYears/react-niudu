import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '@/utils/axios';
import 'html5-reset/assets/css/reset.css';

import 'github-markdown-css';
import '@/styles/index.css';
import App from '@/App';
import store from '@/redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
