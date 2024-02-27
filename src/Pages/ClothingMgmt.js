import React, { useEffect, useState } from "react";
import Accordion from "../components/newCreated/Accordian";
import Pill from "../components/newCreated/Pill";
import axios from "../apis/admin";
import useAxios from "../hooks/useAxios";
import useToast from "../hooks/useToast";
import Toast from "../components/newCreated/Toast";

const ClothingMgmt = () => {
  const [accordions, setAccordion] = useState([]);
  const toggleAccordion = (accordionkey) => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord.key === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen };
      } else {
        return { ...accord, isOpen: false };
      }
    });

    setAccordion(updatedAccordions);
  };
  const [measurementNames, setMeasurementNames] = useState([]);
  const [measurementName, setMeasurementName] = useState("");
  const measurementRef = React.useRef();
  // add measurement name
  const handleAdd = () => {
    if (measurementName === "") return;
    const newMeasurementNames = [...measurementNames];
    newMeasurementNames.push(measurementName);
    setMeasurementNames(newMeasurementNames);
    setMeasurementName("");
    measurementRef.current.focus();
  };
  // remove measurement name
  const handleRemove = (i) => {
    const newMeasurementNames = [...measurementNames];
    newMeasurementNames.splice(i, 1);
    setMeasurementNames(newMeasurementNames);
  };
  const [name, setName] = useState("");
  const [stitchingAmtCustomer, setStitchingAmtCustomer] = useState("");
  const [stitchingAmtTailor, setStitchingAmtTailor] = useState("");
  const [cuttingAmt, setCuttingAmt] = useState("");

  // add data to server
  const handleSubmit = () => {
    if (
      name === "" ||
      stitchingAmtCustomer === "" ||
      stitchingAmtTailor === "" ||
      cuttingAmt === "" ||
      measurementNames.length === 0
    )
      return;
    const data = {
      name,
      stitchingAmtCustomer,
      stitchingAmtTailor,
      cuttingAmt,
      measurements: measurementNames,
    };
    console.log(data);
  };

  // retrive data from server
  const [clothingItems, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/clothingItems",
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  });

  const {
    showToast,
    setShowToast,
    toastMsg,
    setToastMsg,
    setToastType,
    toastType,
    showToastMessage,
  } = useToast();

  // delete data from server
  const handleDelete = (i) => {
    console.log(i);
  };
  // get data to edit in the form
  const handleEdit = (i) => {
    setName(accordions[i].name);
    setStitchingAmtCustomer(accordions[i].stitchingAmtCustomer);
    setStitchingAmtTailor(accordions[i].stitchingAmtTailor);
    setCuttingAmt(accordions[i].cuttingAmt);
    setMeasurementNames(accordions[i].measurements);
  };

  useEffect(() => {
    const newAccordions =
      clothingItems &&
      clothingItems.map((item, i) => {
        return {
          key: i + 1,
          name: item.name,
          measurements: item.measurements,
          stitchingAmtCustomer: item.stitchingAmtCustomer,
          stitchingAmtTailor: item.stitchingAmtTailor,
          cuttingAmt: item.cuttingAmt,
          isOpen: false,
        };
      });
    setAccordion(newAccordions);
    if (error) {
      setShowToast(true);
      setToastMsg(error);
      setToastType("error");
    }
  }, [clothingItems,error]);
  return (
    <>
      {showToast && (
        <Toast
          message={toastMsg}
          type={toastType}
          showToastMessage={showToastMessage}
        />
      )}
      <section>
        <div className="grid md:grid-cols-12 gap-4 text-white">
          <div className="md:col-span-7 bg-[#0b0b0b] border border-[#1b1b1b] smallContainer md:min-h-screen radius">
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex flex-wrap ">
                {/* Name */}
                <div className="my-3 flex gap-2 flex-wrap">
                  <label className="ms-1 w-full">Item name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="inputBox w-60 me-auto md:me-0 -my-2 "
                    placeholder="Clothing item  name"
                  />
                  <p className="me-auto md:me-0 helperText">
                    (Name of the clothing item)
                  </p>
                </div>
                {/* Stitching amt customer*/}
                <div className="my-3 flex  gap-2 flex-wrap">
                  <label className="ms-1 w-full">Stitch (Customer)</label>
                  <input
                    type="number"
                    value={stitchingAmtCustomer}
                    onChange={(e) => setStitchingAmtCustomer(e.target.value)}
                    className="inputBox w-60 me-auto md:me-0 -my-2 "
                    placeholder="Customer amount"
                  />
                  <p className="me-auto md:me-0 helperText">
                    (Amount for <span className="font-bold">Customer</span> to
                    stitch)
                  </p>
                </div>
                {/* Stitching amt tailor*/}
                <div className="my-3 flex  gap-2 flex-wrap">
                  <label className="ms-1 w-full">Stitch (Tailor)</label>
                  <input
                    type="number"
                    value={stitchingAmtTailor}
                    onChange={(e) => setStitchingAmtTailor(e.target.value)}
                    className="inputBox w-60 me-auto md:me-0 -my-2 "
                    placeholder="Tailor amount"
                  />
                  <p className="me-auto md:me-0 helperText">
                    (Amount for <span className="font-bold">Tailor</span> to
                    stitch)
                  </p>
                </div>
                {/* Cutting amt master*/}
                <div className="my-3 flex  gap-2 flex-wrap">
                  <label className="ms-1 w-full">Cut</label>
                  <input
                    type="number"
                    value={cuttingAmt}
                    onChange={(e) => setCuttingAmt(e.target.value)}
                    className="inputBox w-60 me-auto md:me-0 -my-2 "
                    placeholder="CM amount"
                  />
                  <p className="me-auto md:me-0 helperText">
                    (Amount for{" "}
                    <span className="font-bold">Cutiing Master</span> to cut)
                  </p>
                </div>
              </div>
              {/* measurement name*/}
              <div className="my-3">
                <label className="ms-1 block">Measurement names</label>
                <input
                  type="text"
                  ref={measurementRef}
                  className="inputBox -my-2 w-44 md:w-60 "
                  placeholder="Measurement area names"
                  value={measurementName}
                  onChange={(e) => setMeasurementName(e.target.value)}
                />
                <button onClick={handleAdd} className="myBtn my-2 ms-3">
                  ADD
                </button>
                <p className="me-auto md:me-0 helperText">
                  (Measurement areas included to stitch the clothing item)
                </p>
              </div>
              <div
                className={`inputBox min-h-[10rem] flex flex-wrap gap-4 ${
                  measurementNames.length > 0
                    ? ""
                    : "cursor-not-allowed pointer-events-none"
                }`}
              >
                {measurementNames &&
                  measurementNames.map((measurementName, i) => (
                    <Pill
                      handleRemove={handleRemove}
                      key={measurementName}
                      measurementName={measurementName}
                      index={i}
                    />
                  ))}
              </div>
              {/* submit btn */}
              <div className="my-3 flex justify-end">
                <button className="myBtn" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="md:col-span-5 radius w-full">
            {accordions &&
              accordions.length > 0 &&
              accordions.map((accordion, i) => (
                <Accordion
                  key={accordion.key}
                  index={i}
                  name={accordion.name}
                  measurements={accordion.measurements}
                  stitchingAmtCustomer={accordion.stitchingAmtCustomer}
                  stitchingAmtTailor={accordion.stitchingAmtTailor}
                  cuttingAmt={accordion.cuttingAmt}
                  isOpen={accordion.isOpen}
                  toggleAccordion={() => toggleAccordion(accordion.key)}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ClothingMgmt;
