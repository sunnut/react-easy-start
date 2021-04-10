import { useCallback, useEffect, useState } from "react";

function useFetch(getData, params, visible = true) {
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newParams, setNewParams] = useState(params);

    const execRequest = useCallback(async () => {
        try {
            if (visible) {
                setLoading(true);
                let result = await getData(newParams);

                if (result) {
                    result.data = result.data.map(x => ({'key': x.id, ...x}));
                    setData(result);
                }

                setLoading(false);
                setSuccess(true);
            }
        } catch (e) {
            setData(e);
            setLoading(false);
            setSuccess(false);
        }
    }, [getData, newParams]);

    useEffect(() => {
        execRequest();
    }, [execRequest]);

    const request = useCallback(myParams => {
        setNewParams(myParams);
    }, []);

    const refresh = useCallback(() => {
        setNewParams({...newParams});
    }, []);

    return [loading, success, data, request, refresh];
}

export default useFetch;