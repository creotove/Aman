import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../../hooks/useAxios";
import useStitchBill from "../../../hooks/useStitchBill";
import axios from "../../../apis/admin";

const CustomerInfo = () => {
  const {
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    deliveryDate,
    setDeliveryDate,
    takeMeasurementsOf,
    setTakeMeasurementsOf,
  } = useStitchBill();
  // retrive data from server
  const [clothings] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/store/clothingItems",
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  });
  const handleMeasurementTake = (e) => {
    if (e.target.checked) {
      setTakeMeasurementsOf([...takeMeasurementsOf, e.target.value]);
    } else {
      setTakeMeasurementsOf(
        takeMeasurementsOf.filter((item) => item !== e.target.value)
      );
    }
  };
  return (
      <div className="bg-[#0b0b0b] border border-[#1b1b1b] smallContainer radius">
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-wrap gap-4">
            {/* Name */}
            <div className="mt-3 flex flex-col mb-2">
              <label className="ms-1 w-full">Customer name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Customer's name"
              />
            </div>
            {/* Phone Number */}
            <div className="mt-3 flex flex-col mb-2">
              <label className="ms-1 w-full">Phone number</label>
              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Customer's phone number"
              />
            </div>
            {/* Date Picker */}
            <div className="mt-3 flex flex-col mb-2">
              <label className="ms-1 w-full">Delivery Date</label>
              <ReactDatePicker
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                selected={deliveryDate}
                onChange={(date) => setDeliveryDate(date)}
              />
            </div>
          </div>

          {/* Clothing Items */}
          <div className="my-3">
            <label className="ms-1 w-full">Clothing Items</label>
            {clothings &&
              clothings.map((item) => {
                return (
                  <div className="ms-3" key={item.name}>
                    <input
                      onChange={handleMeasurementTake}
                      type="checkbox"
                      className="me-3"
                      id={item.name}
                      name={item.name}
                      checked={takeMeasurementsOf.includes(item.name)}
                      value={item.name}
                    />
                    <label htmlFor={item.name}>{item.name}</label>
                  </div>
                );
              })}
          </div>
        </form>
      </div>
  );
};

export default CustomerInfo;
