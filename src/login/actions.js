import { actions as loadingActions } from '../components/loading/index';
import * as Fetch from '../util/fetch';
import * as LocalStorage from '../util/localstorage';

export const login = (formVal, history) => {
  return (dispatch) => {
    dispatch(loadingActions.showLoading());

    Fetch.post('/api/login', formVal).then((response) => {
      dispatch(loadingActions.hideLoading());

      if (response) {
        LocalStorage.put('TA-username', formVal.userName);
        // 没有发生异常，跳转至主页
        history.push('/home/overview');
      }
    });
  };
};