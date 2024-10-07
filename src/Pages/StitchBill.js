import React from "react";
import Stepper from "../components/newCreated/Stepper";
import useSteps from "../hooks/useSteps";
import useStitchBill from "../hooks/useStitchBill";
import axios from "../apis/admin";
import { useNavigate } from "react-router-dom";
import handlePrint from "../components/newCreated/HandlePrint";

const StitchBill = () => {
  const navigate = useNavigate();
  const { setCurrentStep, currentStep } = useSteps();
  const {
    name,
    phoneNumber,
    advanceAmt,
    totalAmt,
    finalAmt,
    billItems,
    deliveryDate,
    measurements,
  } = useStitchBill();
  const handleSumbit = async () => {
    const data = {
      name,
      phoneNumber,
      totalAmt,
      clothes: billItems,
      deliveryDate,
      finalAmt,
      advanceAmt,
    };
    try {
      handlePrint(measurements);
      const res = await axios.post("/sales/stitchBill", data);
      if (res.data.success) {
        navigate("/customers");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-full ">
      <div className="smallContainer">
        <Stepper />
        {currentStep === 2 ? null : currentStep === 4 ? (
          <button
            className="myBtn absolute right-10 bottom-10"
            onClick={handleSumbit}
          >
            Submit
          </button>
        ) : (
          <button
            className="myBtn absolute right-10 bottom-10"
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            Next
          </button>
        )}

        {currentStep === 2 ? null : currentStep > 1 ? (
          <button
            className="myBtn absolute left-30 bottom-10"
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            Back
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default StitchBill;
