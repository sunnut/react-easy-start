import { useMemo, useState } from "react";

//===================================================================
// Default Pagination
//===================================================================
export const defaultPagination = {
  current: 1,
  pageSize: 10
};

//===================================================================
// Hooks For Pagination
//===================================================================
export default function usePagination(config, hidePage = false) {
  const [pagination, setPagination] = useState(defaultPagination);
  
  const paginationConfig = useMemo(() => {
    if (hidePage) {
      return false;
    } else {
      return {
        ...config,
        ...pagination,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30', '50'],
        showQuickJumper: true,
        onChange: (current, pageSize) => {
          setPagination({ pageSize, current });
        },
        onShowSizeChange: (current, pageSize) => {
          setPagination({ pageSize, current });
        }
      };
    }
  }, [config, hidePage, pagination]);

  return paginationConfig;
};