import { useEffect } from "react";
import { useState } from "react";

const useAxios = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [controller, setController] = useState();
  const [success, setSuccess] = useState();

  const axiosFetch = async (configObj) => {
    const { axiosInstance, url, method, requestConfig = {} } = configObj;
    try {
      setIsLoading(true);
      setSuccess(false);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      setResponse(res.data.data);
      if(res.data.success|| res.data.data.success){
        setSuccess(true);
        setError("");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      controller && controller.abort();
    };
  }, []);

  return [response, error, loading, success,axiosFetch];
};

export default useAxios;
