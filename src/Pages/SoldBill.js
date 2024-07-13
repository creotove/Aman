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
      <div className="md:col-span-6 bg-[#0b0b0b] border border-[#1b1b1b] smallContainer md:min-h-screen radius ">
        <button className="myBtn">Print</button>
        <div className="myInvoiceContainer radius p-3">
          <div className="flex justify-between ">
            <h2 className="text-2xl">Preview</h2>
          </div>
          <div className="flex justify-between">
            <div>
              <h3>Customer Name</h3>
              <p>{name}</p>
            </div>
            <div>
              <h3>Customer Phone Number</h3>
              <p>{phoneNumber}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <h3>Company Address</h3>
              <p>Chandragiri, Kathmandu</p>
            </div>
            <div>
              <h3>Company Phone Number</h3>
              <p>9860123456</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <h3>Invoice Date</h3>
              <p>{new Date().toDateString()}</p>
            </div>
            <div>
              <h3>Invoice Number</h3>
              <p>123456</p>
            </div>
          </div>
          <div className="my-3">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Fabric Name</th>
                  <th>Fabric Meter</th>
                  <th>Fabric Meter Price</th>
                  <th>Fabric Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Shirt</td>
                  <td>2</td>
                  <td>500</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>Pant</td>
                  <td>2</td>
                  <td>500</td>
                  <td>1000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-between">
            <div>
              <h3>Total Amount</h3>
              <p>{totalAmt}</p>
            </div>
            <div>
              <h3>Discount</h3>
              <p>0</p>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default SoldBill;
