import React, { useEffect, useRef, useState } from "react";
import "../../ComponentCss/Stepper.css";
import useSteps from "../../hooks/useSteps.js";

const Stepper = () => {
  const stepRef = useRef([]);
  const {
    currentStep,
    stepsConfig,
    isComplete,
  } = useSteps();
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });


  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1].Component;

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig.length]);

  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, idx) => (
          <div
            key={idx}
            ref={(el) => {
              stepRef.current[idx] = el;
            }}
            className={`step ${currentStep > idx + 1 || isComplete ? "complete" : ""
              } ${currentStep === idx + 1 ? "active" : ""}`}
          >
            <div className="z-10 radius h-8 w-8 border step-number border-slate-200 bg-black flex justify-center items-center">
              {currentStep > idx + 1 || isComplete ? (
                <span>    <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.72868 16.0388L0.5 10.8101L2.26744 9.18992L5.72868 12.6512L17.7326 0.5L19.5 2.26744L5.72868 16.0388Z" fill="#166534" />
                </svg></span>
              ) : (
                idx + 1
              )}
            </div>
            <div className="step-name whitespace-nowrap">{step.name}</div>
          </div>
        ))}
        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{
              width: `${calculateProgressBarWidth()}%`,
            }}
          ></div>
        </div>
      </div>
      <section className="flex flex-col">
        <ActiveComponent />
        <div className="flex justify-end">
          {/* {!isComplete && (
            <button className="btn btn-primary" onClick={handleNext}>
              {currentStep === stepsConfig.length ? "Publish" : "Next"}
            </button>
          )} */}
        </div>
      </section>
    </>
  );
};

export default Stepper;