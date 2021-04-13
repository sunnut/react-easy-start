import React, { useMemo, useState } from 'react';
import { Button, Table  } from 'antd';
import * as API from './api';
import getColumns from './columns';
import { useFetch, useTable } from '../../components/hooks';

const UserDetailPromise = import('./detail');
const UserDetail = React.lazy(() => UserDetailPromise);

const UserComponent = () => {
  const [tableProps, refetchUsers, params, , resetSelection] = useTable({
    getData: API.getUsers,
    options: {
      onChange: (...pageParams) => refetchUsers(API.getParams(...pageParams))
    }
  });

  const [ , selectedUser, setSelectedUser, getUserDetail] = useFetch(API.getUserDetail, false);
  const columns = useMemo(() => getColumns(getUserDetail), []);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {selectedUser && <UserDetail user={selectedUser.data} onClose={() => setSelectedUser(null)} />}
      <div style={{marginBottom: '8px'}} className="clearfix">
        <div style={{float: 'left'}}>
          <Button type="primary" onClick={() => API.refresh(refetchUsers, params, resetSelection)} icon="reload">
            刷新
          </Button>
          &nbsp;&nbsp;
        </div>
      </div>
      <Table columns={columns} {...tableProps} />
    </React.Suspense>
  );
};

export default UserComponent;