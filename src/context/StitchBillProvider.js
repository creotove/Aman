import { createContext, useState } from "react";

const StitchBillContext = createContext({});

export const StitchBillProvider = ({ children }) => {
  const [customerId, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [takeMeasurementsOf, setTakeMeasurementsOf] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [initializeMeasurements, setInitializeMeasurements] = useState({});
  const [advanceAmt, setAdvanceAmt] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const [finalAmt, setFinalAmt] = useState(0);
  const [clothingItemsQty, setClothingItemsQty] = useState([]);
  const [stitchItems, setStitchItems] = useState([]);
  const [billItems, setBillItems] = useState([]);

  return (
    <StitchBillContext.Provider
      value={{
        name,
        setName,
        phoneNumber,
        setPhoneNumber,
        deliveryDate,
        setDeliveryDate,
        takeMeasurementsOf,
        setTakeMeasurementsOf,
        measurements,
        setMeasurements,
        customerId,
        setCustomerId,
        initializeMeasurements,
        setInitializeMeasurements,
        advanceAmt,
        setAdvanceAmt,
        totalAmt,
        setTotalAmt,
        finalAmt,
        setFinalAmt,
        clothingItemsQty,
        setClothingItemsQty,
        stitchItems,
        setStitchItems,
        billItems, setBillItems,
      }}
    >
      {children}
    </StitchBillContext.Provider>
  );
};

export default StitchBillContext;
