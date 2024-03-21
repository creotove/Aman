import React, { useState, useEffect } from "react";
import axios from "../../../apis/admin";
import useStitchBill from "../../../hooks/useStitchBill";
import useSteps from "../../../hooks/useSteps";

const MeasurementStepper = () => {
  const [measurementsData, setMeasurementsData] = useState([]);
  const {
    customerId,
    setCustomerId,
    takeMeasurementsOf,
    name,
    phoneNumber,
    setMeasurements,
    initializeMeasurements,
    setInitializeMeasurements,
  } = useStitchBill();
  const { setCurrentStep } = useSteps();
  const [activeStep, setActiveStep] = useState(0);
  const [measurement, setMeasurement] = useState({});

  const checkMeasurements = async () => {
    try {
      const res = await axios.post("/checkMeasurements", {
        name,
        phoneNumber,
        clothingItems: takeMeasurementsOf,
      });
      if (res.data.success) {
        setMeasurementsData(res.data.data.measurements);
        initializeMeasurement(res.data.data.measurements);
        setCustomerId(res.data.data.customer_id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addMeasurements = async (name) => {
    try {
      const addMeasurementof = Object.entries(measurement).map(
        ([key, value]) => {
          return {
            name: key,
            measurements: value,
          };
        }
      );
      const measurements = addMeasurementof.find((item) => item.name === name);
      const res = await axios.post(`/addMeasurement/${customerId}`, {
        name,
        measurements: measurements.measurements,
      });
      if (res.data.success) {
        handleNext();
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkMeasurements();
    // eslint-disable-next-line
  }, []);

  const initializeMeasurement = (data) => {
    if (
      Array.isArray(initializeMeasurements) &&
      initializeMeasurements.length > 0
    ) {
      const initialMeasurements = {};
      initializeMeasurements.forEach((item) => {
        initialMeasurements[item.name] = { ...item.measurements };
      });
      setMeasurement(initialMeasurements);
      setMeasurements(initialMeasurements);
      return;
    }
    const initialMeasurements = {};
    data.forEach((item) => {
      initialMeasurements[item.name] = { ...item.measurements };
    });
    setMeasurement(initialMeasurements);
    setMeasurements(initialMeasurements);
  };

  const handleNext = () => {
    if (activeStep === measurementsData.length - 1) {
      setCurrentStep(3);
      return;
    }
    setActiveStep((prevStep) =>
      Math.min(prevStep + 1, measurementsData.length - 1)
    );
  };

  const handlePrev = () => {
    if (activeStep === 0) {
      setCurrentStep(1);
      return;
    }
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleFocus = (event) => event.target.select();
  const handleMeasurementChange = (clothing, name, value) => {
    setMeasurements((prevMeasurements) => ({
      ...prevMeasurements,
      [clothing]: {
        ...(prevMeasurements[clothing] || {}),
        [name]: value,
      },
    }));

    setMeasurement((prevMeasurement) => ({
      ...prevMeasurement,
      [clothing]: {
        ...(prevMeasurement[clothing] || {}),
        [name]: value,
      },
    }));

    const updatedMeasurements = measurementsData.map((item) => ({
      name: item.name,
      measurements: {
        ...item.measurements,
        ...(item.name === clothing ? { [name]: value } : {}),
      },
    }));
    setInitializeMeasurements(updatedMeasurements);
  };
  return (
    <div className=" bg-[#0b0b0b] border border-[#1b1b1b] smallContainer  radius">
      <div className="container mx-auto">
        <h2 className="text-lg font-bold mb-4">
          {measurementsData[activeStep]?.name}
        </h2>
        <form>
          <div className="flex flex-wrap gap-4">
            {Object.entries(
              measurement[measurementsData[activeStep]?.name] || {}
            ).map(([name, value]) => (
              <div key={name} className="mt-3 flex flex-col mb-2">
                <label htmlFor={value} className="">
                  {name}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleMeasurementChange(
                      measurementsData[activeStep]?.name,
                      name,
                      e.target.value
                    )
                  }
                  name={value}
                  id={value}
                  onFocus={handleFocus}
                  className="inputBox w-60 me-auto md:me-0 "
                  placeholder="Enter measurement"
                />
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrev}
          className="myBtn absolute left-30 bottom-10"
        >
          Previous
        </button>
        <button
          onClick={() => addMeasurements(measurementsData[activeStep]?.name)}
          className="myBtn absolute right-10 bottom-10"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MeasurementStepper;
