import { useCallback, useEffect, useState } from "react";

//===================================================================
// Hooks For Fetch
//===================================================================
function useFetch(fetch, params, visible = true) {
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [newParams, setNewParams] = useState(params);

  const execRequest = useCallback(async () => {
    try {
      if (visible) {
        setLoading(true);
        let data = await fetch(newParams);

        if (data) {
          data.params = newParams;
          setResult(data);
        }

        setLoading(false);
      }
    } catch (e) {
      throw e;
    }
  }, [fetch, newParams]);

  useEffect(() => {
    execRequest();
  }, [execRequest]);

  const request = useCallback(myParams => {
    setNewParams(myParams);
  }, []);

  const refetch = useCallback(() => {
    setNewParams({...newParams});
  }, []);

  return [loading, result, request, refetch];
}

export default useFetch;