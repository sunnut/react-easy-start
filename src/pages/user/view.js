import React, { useMemo } from 'react';
import { Table  } from 'antd';
import * as UserAPI from './api';
import getColumns from './columns';
import { useTable } from '../../components/hooks';

const UserComponent = () => {
  const columns = useMemo(() => getColumns(), []);

  const [data, request] = useTable({
    getData: UserAPI.getUsers,
    onChange: (pagination, filters, sorter, extra) => {
      request(UserAPI.getParams(pagination, filters, sorter, extra));
    }
  });

  return (
    <>
      <Table columns={columns} {...data} />
    </>
  );
};

export default UserComponent;