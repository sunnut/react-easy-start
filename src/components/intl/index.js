import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import enUS from 'antd/lib/locale-provider/en_US';
import { IntlProvider } from 'react-intl';
import zh from '../../assets/i18n/zh.json';
import en from '../../assets/i18n/en.json';
import { useSelector } from 'react-redux';

export default function Intl(props) {
  const localLang = useSelector(state => state.home.localLang);
  const i18nData = {zh, en};
  const languageMap = {
    'en': enUS,
    'zh': zhCN
  };

  return (
    <IntlProvider key={localLang} locale={localLang} messages={i18nData[localLang]}>
      <ConfigProvider locale={languageMap[localLang]}>
        {props.children}
      </ConfigProvider>
    </IntlProvider>
  );
};