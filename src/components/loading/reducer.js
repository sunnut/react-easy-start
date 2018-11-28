import { HIDE_LOADING, SHOW_LOADING } from './actionTypes';

export default (state = {show: false}, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return {show: true};
    case HIDE_LOADING:
      return {show: false};
    default:
      return state;
  }
};