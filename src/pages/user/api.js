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
// delete users
//===================================================================
export const deleteUser = params => {
  return Fetch.post('/api/v1.0/users/batchDelete', params);
};

const SORTER_VALUES = {'ascend': 'asc', 'descend': 'desc'};

//===================================================================
// get the page params after table changed
//===================================================================
export const getParams = (pagination, filters, sorter) => {
  return {
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
    sortField: sorter.field,
    sortOrder: SORTER_VALUES[sorter.order],
    ...filters
  };
};

//===================================================================
// clear the empty data of params
//===================================================================
export const processParams = (params) => {
  if (!params.sortOrder) {
    // no order
    delete params.sortOrder;
    delete params.sortField;
  }

  for (let [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        delete params[key];
      } else {
        params[key] = value.map(item => {
          if (typeof item === 'object' && item._isAMomentObject) {
            return item.valueOf();
          } else {
            return item;
          }
        });
      }
    } else if (typeof value === 'object' && value._isAMomentObject) {
      params[key] = value.valueOf();
    }
  }
};

//===================================================================
// Refresh Page
//===================================================================
export const refresh = (request, params, resetSelection) => {
  resetSelection();
  request({...params});
};