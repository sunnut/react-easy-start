import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import ZH_WORDS from './assets/i18n/zh.json';
import EN_WORDS from './assets/i18n/en.json';
import store from './Store.js';
import App from './App';
import 'antd/dist/antd.css';
import './assets/css/common.css';

addLocaleData([...en, ...zh]);

const userLang = navigator.language || '';
const language = userLang.toLowerCase().substr(0, 2);
let locale;
let messages;

if (language === 'zh') {
  locale = 'zh';
  messages = ZH_WORDS;
} else if (language === 'en') {
  locale = 'en';
  messages = EN_WORDS;
}

ReactDOM.render(
  <IntlProvider locale={locale} messages={messages}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById('root')
);