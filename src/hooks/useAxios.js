import { useEffect } from "react";
import { useState } from "react";

const useAxios = (configObj) => {
  const { axiosInstance, url, method, requestConfig = {} } = configObj;
  const [response, setResponse] = useState();
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(true);

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
    // return () => {
    //   controller.abort();
    // };
    // eslint-disable-next-line
  }, []);

  return [response, error, loading];
};

export default useAxios;
