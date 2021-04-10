import React from 'react';
import { Table  } from 'antd';
import { getColumns, getUsers } from './api';
import useTable from '../../util/use-table';

const columns = getColumns();

const UserComponent = () => {
  const [success, data, request] = useTable({
    getData: getUsers,
    params: null,
    onChange: (pagination, filters, sorter, extra) => {
        request({pageNo: pagination.current, pageSize: pagination.pageSize});
    }
  });

  return (
      <>
        {success && <Table columns={columns} {...data} />}
      </>
  );
};

export default UserComponent;

