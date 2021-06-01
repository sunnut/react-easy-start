import React, { useCallback, useRef } from 'react';
import { Table  } from 'antd';
import * as API from './api';
import useColumn from './useColumn';
import BatchActions from './batchActions';
import { useTable } from '../../components/hooks';

const PkgMgrComponent = () => {
  const [tableProps, refetchPkg, initParams, selectedList, resetSelection, pkgData, setPkgData] = useTable({
    getData: API.getData,
    options: {
      onChange: (...pageParams) => research(API.getParams(...pageParams))
    }
  });
  const searchParams = useRef(initParams);
  const research = useCallback(changedParams => {
    if (changedParams) {
      let newParams = {...searchParams.current, ...changedParams};
      searchParams.current = newParams;
      refetchPkg(searchParams.current);
    } else {
      refetchPkg({...searchParams.current});
    }

    resetSelection();
  }, []);
  const [columns] = useColumn();

  return (
    <>
      <BatchActions selectedList={selectedList} refresh={research} data={pkgData} setData={setPkgData} />
      <Table columns={columns} {...tableProps} />
    </>
  );
};

export default PkgMgrComponent;