import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Intl from './components/intl'
import store from './Store.js';
import App from './App';
import 'antd/dist/antd.css';
import 'webuploader/dist/webuploader.css';
import './assets/css/common.css';

ReactDOM.render(
  <Provider store={store}>
    <Intl>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Intl>
  </Provider>,
  document.getElementById('root')
);