import useFetch from './use-fetch';
import usePagination, { defaultPagination } from './use-pagination';

function useTable(options) {
    const [loading, success, data, request, refresh] = useFetch(
        options.getData,
        {
            pageNo: defaultPagination.current,
            pageSize: defaultPagination.pageSize,
            ...options.params
        }
    );

    const tableProps = {
        loading,
        dataSource: data.data,
        onChange: (pagination, filters, sorter, extra) => {
            if (options.onChange) {
                options.onChange(pagination, filters, sorter, extra);
            }
        }
    };

    const paginationConfig = usePagination({
        total: data.total || 0,
        ...(options.pagination || {})
    });

    if (options.pagination === false) {
        tableProps.pagination = false;
    } else {
        tableProps.pagination = paginationConfig;
    }

    return [success, tableProps, request, refresh];
}

export default useTable;