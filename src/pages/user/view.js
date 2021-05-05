import React, { useRef, useCallback, useEffect } from 'react';
import { Table  } from 'antd';
import * as ActionTypes from './actionTypes';
import * as API from './api';
import useColumn from './useColumn';
import { useFetch, useTable } from '../../components/hooks';
import BatchActions from './batchActions';

const UserDetailPromise = import('./detail');
const UserDetail = React.lazy(() => UserDetailPromise);

const UserComponent = () => {
  const [tableProps, refresh, oldParams, selectedList] = useTable({
    getData: API.getUsers,
    options: {
      onChange: (...pageParams) => {
        let newParams = {...oldParams, ...API.getParams(...pageParams)};
        API.processParams(newParams);
        refresh(newParams);
      }
    }
  });
  const [ , userInfo, setUserInfo, refetchUser] = useFetch(API.getUserDetail, false);
  const [columns, currentUser] = useColumn();

  useEffect(() => {
    if (currentUser !== null) {
      switch (currentUser.flag) {
        case ActionTypes.ACTION_DETAIL: 
          refetchUser({id: currentUser.id});
          break;
      }
    }
  }, [currentUser]);

  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <BatchActions selectedList={selectedList} refresh={refresh} />
      <Table columns={columns} {...tableProps} />
      {userInfo && (
        <UserDetail user={userInfo.data} onClose={() => setUserInfo(null)} />
      )}
    </React.Suspense>
  );
};

export default UserComponent;