import { useCallback, useEffect, useState } from "react";

//===================================================================
// Hooks For Fetch
//===================================================================
export default function useFetch(fetch, params) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newParams, setNewParams] = useState(params);

  const execRequest = useCallback(async () => {
    try {
      if (newParams !== false) {
        setLoading(true);
        let data = await fetch(newParams);

        if (data) {
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

  return [loading, result, setResult, request, newParams];
};