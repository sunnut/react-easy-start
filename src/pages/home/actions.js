import { CHANGE_LANGUAGE } from './actionTypes';

export const changeLanage = (lang) => (dispatch) => {
  dispatch({
    type: CHANGE_LANGUAGE,
    payload: lang
  });
};