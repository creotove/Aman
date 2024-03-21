import React from "react";
import Stepper from "../components/newCreated/Stepper";
import useSteps from "../hooks/useSteps";
import useStitchBill from "../hooks/useStitchBill";
import axios from "../apis/admin";
import { useNavigate } from "react-router-dom";

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
      const res = await axios.post("/addStitchBill", data);
      if (res.data.success) {
        navigate("/customers");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="">
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
