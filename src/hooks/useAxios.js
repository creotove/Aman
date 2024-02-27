import { useEffect } from "react";
import { useState } from "react";

const useAxios = (configObj) => {
  const { axiosInstance, url, method, requestConfig = {} } = configObj;
  const [response, setResponse] = useState();
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const refetch = () => {
    setReload((prev) => prev + 1);
  };
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        // console.log(res);
        setResponse(res.data.data);
      } catch (error) {
        // console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [reload]);

  return [response, error, loading, refetch];
};

export default useAxios;
