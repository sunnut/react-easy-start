import { useMemo, useState } from "react";

export const defaultPagination = {
    pageSize: 10,
    current: 1
};

function usePagination(config) {
    const [pagination, setPagination] = useState({
      pageSize: config.pageSize || defaultPagination.pageSize,
      current: config.page || config.defaultCurrent || defaultPagination.current
    });
  
    const paginationConfig = useMemo(() => {
        return {
            showTotal: total => `每页 ${pagination.pageSize} 条  第 ${pagination.current}页 共 ${total} 条`,
            ...config,
            pageSize: pagination.pageSize,
            current: pagination.current,
            onChange: (current, pageSize) => {
                if (config.onChange) {
                    config.onChange(current, pageSize);
                }
                setPagination({ pageSize, current });
            },
            onShowSizeChange: (current, pageSize) => {
                if (config.onChange) {
                    config.onChange(current, pageSize);
                }
                setPagination({ pageSize, current });
            }
        };
    }, [config, pagination]);
  
    return paginationConfig;
}

export default usePagination;