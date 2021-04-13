import { useCallback, useMemo, useState } from "react";

//===================================================================
// Hooks For RowSelection
//===================================================================
export default function useRowSelection(options) {
  const [selectedList, setSelectedList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = useMemo(() => {
    if (options === false) return null;
    return {
      columnWidth: "44px",
      selectedRowKeys,
      onChange: (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
      },
      onSelect: (record, selected) => {
        if (selected) {
          setSelectedList([...selectedList, record]);
        } else {
          setSelectedList(selectedList.filter(x => x.key !== record.key));
        }
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        if (selected) {
          setSelectedList([...selectedList, ...changeRows]);
        } else {
          setSelectedList(selectedList.filter(x => changeRows.find(y => x.key === y.key) === undefined));
        }
      }
    };
  }, [selectedList, selectedRowKeys]);

  // 操作完取消选中
  const resetSelection = useCallback(() => {
    setSelectedList([]);
    setSelectedRowKeys([]);
  }, []);

  return [rowSelection, selectedList, resetSelection];
};