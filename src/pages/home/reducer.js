import { CHANGE_LANGUAGE } from './actionTypes';
import session from '../../util/session';

const getBrowserLanguage = () => {
    const curLanguage = session.get('language');

    if (curLanguage) {
        return curLanguage;
    }

    return window.navigator.language === 'zh-CN' ? 'zh' : 'en';
};

export default (state = {
  localLang: getBrowserLanguage() || 'en'
}, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
          ...state,
          localLang: action.payload
      };
    default:
      return state
  }
};