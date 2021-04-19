import React, { useRef, useCallback } from 'react';
import { Table  } from 'antd';
import * as API from './api';
import useColumn from './useColumn';
import { useFetch, useTable } from '../../components/hooks';
import BatchActions from './batchActions';

const UserDetailPromise = import('./detail');
const UserDetail = React.lazy(() => UserDetailPromise);

const UserComponent = () => {
  const [tableProps, refetchUsers, initParams, selectedList, resetSelection] = useTable({
    getData: API.getUsers,
    options: {
      onChange: (...pageParams) => research(API.getParams(...pageParams))
    }
  });
  const searchParams = useRef(initParams);
  const research = useCallback(changedParams => {
    if (changedParams) {
      let newParams = {...searchParams.current, ...changedParams};
      API.processParams(newParams);
      searchParams.current = newParams;
      refetchUsers(searchParams.current);
    } else {
      refetchUsers({...searchParams.current});
    }

    resetSelection();
  }, []);
  const [ , userInfo, setUserInfo, getUserDetail] = useFetch(API.getUserDetail, false);
  const [columns] = useColumn({getUserDetail});

  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <BatchActions selectedList={selectedList} research={research} />
      <Table columns={columns} {...tableProps} />
      {userInfo && (
        <UserDetail user={userInfo.data} onClose={() => setUserInfo(null)} />
      )}
    </React.Suspense>
  );
};

export default UserComponent;