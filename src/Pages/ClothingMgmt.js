import React, { useEffect, useState } from "react";
import Accordion from "../components/newCreated/Accordian";
import Pill from "../components/newCreated/Pill";
import axios from "../apis/admin";
import useToast from "../hooks/useToast";
import Toast from "../components/newCreated/Toast";

const ClothingMgmt = () => {
  const [accordions, setAccordion] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const [measurementName, setMeasurementName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const measurementRef = React.useRef();

  // add measurement name
  const handleAdd = () => {
    if (measurementName === "") return;
    const newMeasurementNames = [...measurementNames];
    const capitalizedName = measurementName.charAt(0).toUpperCase() + measurementName.slice(1);
    newMeasurementNames.push(capitalizedName.trim());
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
  const [measurementNames, setMeasurementNames] = useState([]);

  // add data to server
  const handleSubmit = async () => {
    if (
      name === "" ||
      stitchingAmtCustomer === "" ||
      stitchingAmtTailor === "" ||
      cuttingAmt === "" ||
      measurementNames.length === 0
    )
      return;
    try {
      const data = {
        name,
        stitchingAmtCustomer,
        stitchingAmtTailor,
        cuttingAmt,
        measurements: measurementNames,
      };
      let res;
      if (editMode) {
        res = await axios.patch(`/clothingItem/${editId}`, data);
      } else {
        res = await axios.post("/clothingItem", data);
      }
      if (res.data.success) {
        setShowToast(true);
        setToastMsg(res.data?.message);
        setToastType("success");
        getClotingItems();
        setName("");
        setStitchingAmtCustomer("");
        setStitchingAmtTailor("");
        setCuttingAmt("");
        setMeasurementNames([]);
        getClotingItems();
      }
    } catch (error) {
      setShowToast(true);
      setToastMsg(error.response.data.message);
      setToastType("error");
      console.log(error.response.data.message);
    }
  };

  const getClotingItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/clothingItems");
      if (res.data.success) {
        const clothingItems = res?.data?.data;
        if (clothingItems.length === 0) {
          setAccordion([]);
          return;
        }
        const newAccordions = clothingItems.map((item, i) => {
          return {
            id: item._id,
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
      }
    } catch (error) {
      setShowToast(true);
      setToastMsg(error.response.data.message);
      setToastType("error");
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
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
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/clothingItem/${id}`);
      if (res.data.success) {
        setShowToast(true);
        setToastMsg(res.data.message);
        setToastType("success");
        getClotingItems();
      }
    } catch (error) {
      setShowToast(true);
      setToastMsg(error.response.data.message);
      setToastType("error");
      console.log(error.response.data.message);
    }
  };
  // get data to edit in the form
  const handleEdit = (i) => {
    setEditMode(true);
    setEditId(accordions[i].id);
    setName(accordions[i].name);
    setStitchingAmtCustomer(accordions[i].stitchingAmtCustomer);
    setStitchingAmtTailor(accordions[i].stitchingAmtTailor);
    setCuttingAmt(accordions[i].cuttingAmt);
    setMeasurementNames(accordions[i].measurements);
  };
  useEffect(() => {
    getClotingItems();
  }, []);
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
                className={`bg-black border border-[#525252] p-4 radius min-h-[10rem] flex flex-wrap gap-4 ${measurementNames.length > 0
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
              accordions.length > 0 ?
              accordions.map((accordion, i) => (
                <Accordion
                  key={accordion.key}
                  index={i}
                  id={accordion.id}
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
              )) : loading ? (
                <div className="flex justify-center items-center h-96">
                  <div className="loader"></div>
                </div>
              ) : (
                <div className="md:col-span-5 radius flex bg-[#0b0b0b] border border-[#1b1b1b]
                justify-center items-center h-full
                smallContainer">
                  <p className="text-[#FC3447]">No Clothings Items found</p>
                </div>
              )
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default ClothingMgmt;
