import { createContext, useState } from "react";
import CustomerInfo from "../components/newCreated/Steps/CustomerInfo";
import Measurements from "../components/newCreated/Steps/Measurements";
import Bill from "../components/newCreated/Steps/Bill";
import Overview from "../components/newCreated/Steps/Overview";

const StepsContext = createContext({});

export const StepsProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const stepsConfig = [
    {
      id: 1,
      name: "Customer Info",
      Component: () => <CustomerInfo />,
    },
    {
      id: 2,
      name: "Measurements",
      Component: () => <Measurements />,
    },
    {
      id: 3,
      name: "Bill",
      Component: () => <Bill />,
    },
    {
      id: 4,
      name: "OverView",
      Component: () => <Overview />,
    }
  ];
  return (
    <StepsContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        complete,
        setComplete,
        stepsConfig,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};

export default StepsContext;
