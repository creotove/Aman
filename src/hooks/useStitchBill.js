import { useContext } from "react";
import StitchBillProvider from "../context/StitchBillProvider";

const useStitchBill = () => {
  return useContext(StitchBillProvider);
};

export default useStitchBill;