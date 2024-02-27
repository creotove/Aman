import { useState, useEffect } from "react";

const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("Hello");
  const [toastType, setToastType] = useState("error");

  const showToastMessage = (message, type) => {
    setToastMsg(message);
    setToastType(type);
    setShowToast(true);
  };
  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      setShowToast(false);
    }, 2000);
    return () => {
      clearTimeout(setTimeOutId);
    };
  }, [showToast]);

  return {
    showToast,
    setShowToast,
    toastMsg,
    setToastMsg,
    setToastType,
    toastType,
    showToastMessage,
  };
};

export default useToast;
