import * as Fetch from '../../util/fetch';

//===================================================================
// User Data Request
//===================================================================
export const getUsers = params => {
    const url = '/api/v1.0/users';
    return Fetch.get(url, params);
};

//===================================================================
// renew the params after table changed
//===================================================================
export const getParams = (pagination, filters, sorter, extra) => {
    return {pageNo: pagination.current, pageSize: pagination.pageSize};
};