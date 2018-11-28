import { HIDE_LOADING, SHOW_LOADING } from './actionTypes';

export const showLoading = () => ({
  type: SHOW_LOADING
});

export const hideLoading = () => ({
  type: HIDE_LOADING
});