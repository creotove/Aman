import React, { useState } from "react";
import axios from "../apis/admin";
import useToast from "../hooks/useToast";
import Toast from "../components/newCreated/Toast";

const SoldBill = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [totalAmt, setTotalAmt] = useState("");
  const {
    showToast,
    setShowToast,
    setToastMsg,
    setToastType,
    toastMsg,
    toastType,
  } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await axios.post("/soldBill", {
        name,
        phoneNumber,
        totalAmt,
      });
      if (res.data.success) {
        setShowToast(true);
        setToastMsg(res.data.message);
        setToastType("success");
        setName("");
        setPhoneNumber("");
        setTotalAmt("");
      }
    } catch (error) {
      setShowToast(true);
      setToastMsg(error.response.data.message);
      setToastType("error");
    }
  };
  return (
    <section className="md:grid-cols-12 grid gap-4">
      {showToast && (
        <Toast
          message={toastMsg}
          type={toastType}
          onClose={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowToast(false);
          }} // Close the toast
        />
      )}
      {/* Create */}
      <div className="md:col-span-6 bg-[#0b0b0b] border border-[#1b1b1b] smallContainer md:min-h-screen radius">
        <h2 className="text-2xl">Create</h2>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col  items-center ">
            {/* Name */}
            <div className="my-3 ">
              <label className="ms-1 block">Customer name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="inputBox w-48 md:w-96 me-auto md:me-0 -my-1 "
                placeholder="Customer's name"
              />
            </div>
            {/* phone number */}
            <div className="my-3 ">
              <label className="ms-1 block">Phone number</label>
              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="inputBox w-48 md:w-96 me-auto md:me-0 -my-1 "
                placeholder="Customer's phone number"
              />
            </div>
            {/* Name */}
            <div className="my-3 ">
              <label className="ms-1 block">Total Amount</label>
              <input
                type="number"
                value={totalAmt}
                onChange={(e) => setTotalAmt(e.target.value)}
                className="inputBox w-48 md:w-96 me-auto md:me-0 -my-1 "
                placeholder="Bill amount"
              />
            </div>
          </div>

          {/* submit btn */}
          <div className="my-3 flex justify-end">
            <button className="myBtn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* Preview */}
      <div className="md:col-span-6 bg-[#0b0b0b] border border-[#1b1b1b] smallContainer md:min-h-screen radius">
        <h2 className="text-2xl">Preview</h2>
      </div>
    </section>
  );
};

export default SoldBill;
