import useFetch from './useFetch';
import usePagination, { defaultPagination } from './usePagination';
import useRowSelection from './useRowSelection';
import { useMemo, useCallback } from 'react';

//===================================================================
// Hooks For Table
//===================================================================
function useTable(options) {
  let hidePagination = options.pagination === false;
  let reqParams = null;

  if (!hidePagination) {
    reqParams = {
      pageNo: defaultPagination.current,
      pageSize: defaultPagination.pageSize
    };
  }

  const [loading, result, request, refetch] = useFetch(options.getData, reqParams);
  const dataSource = useMemo(() => addKeyForTableData(hidePagination, result), [result]);

  const paginationConfig = useMemo(() => {
    return {
      total: hidePagination ? 0 : result.total,
      ...(options.pagination || {})
    };
  }, [hidePagination, result.total]);

  const pagination = usePagination(paginationConfig, hidePagination);
  const [rowSelection, selectedList, resetSelection] = useRowSelection(options.rowSelection);

  const refresh = useCallback(() => {
    refetch();
    resetSelection();
  }, []);

  const tableProps = {
    loading,
    dataSource,
    pagination,
    rowSelection,
    onChange: (pagination, filters, sorter, extra) => {
      if (options.onChange) {
        options.onChange(pagination, filters, sorter, extra);
      }
    }
  };

  return [tableProps, request, refresh, selectedList];
}

//===================================================================
// Add Key property For Table data
//===================================================================
function addKeyForTableData(hidePagination, result) {
  if (!result) return [];
  let data = result.data || [];

  if (hidePagination) {
    // No pagination
    return data.map((item, index) => ({key: index, ...item}));
  } else if (result.params) {
    let page = result.params.pageNo - 1;
    let pageSize = result.params.pageSize;
    return data.map((item, index) => ({key: index + page * pageSize, ...item}));
  }

  return [];
}

export default useTable;