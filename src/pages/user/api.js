import * as Fetch from '../../util/fetch';

//===================================================================
// User Data Request
//===================================================================
export const getUsers = params => {
  const url = '/api/v1.0/users';
  return Fetch.get(url, params);
};

//===================================================================
// get user detail
//===================================================================
export const getUserDetail = params => {
  return Fetch.get('/api/v1.0/users/' + params.id);
};

//===================================================================
// renew the params after table changed
//===================================================================
export const getParams = (pagination, filters, sorter, extra) => {
  return {pageNo: pagination.current, pageSize: pagination.pageSize};
};

//===================================================================
// Refresh Page
//===================================================================
export const refresh = (request, params, resetSelection) => {
  resetSelection();
  request({...params});
};