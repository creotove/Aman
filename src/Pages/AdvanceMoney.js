import axios from "../apis/admin";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import Toast from "../components/newCreated/Toast";
import FormatNumber from "../components/newCreated/FormatNumber";

const AdvanceMoney = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeProfile = location.state?.employeeProfile;
  // const advanceAmount = employeeProfile?.employeeDetails?.advanceAmount || 0;
  const [amount, setAmount] = useState(0);
  const {
    showToast,
    setShowToast,
    setToastMsg,
    setToastType,
    toastMsg,
    toastType,
  } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (amount <= 0) {
      setShowToast(true);
      setToastMsg("Amount must be greater than 0");
      setToastType("error");
      return;
    }else if(amount > employeeProfile?.employeeDetails?.advance){
      setShowToast(true);
      setToastMsg("Amount must be less than or equal to advance amount");
      setToastType("error");
      return;
    }
    try {
      const res = await axios.post(`/employees/takeMoneyThatWasGivenAdvanceToEmployee/${employeeProfile?._id}`, {
        amount,
      });
      if (res.data.success) {
        setShowToast(true);
        setToastMsg(res.data.message);
        setToastType("success");
        navigate(`/employees/${employeeProfile?._id}`, {
          state: employeeProfile?.role.toUpperCase(),
        });
      } else {
        setShowToast(true);
        setToastMsg(res.data.message);
        setToastType("error");
      }
    } catch (error) {
      console.error("Error submitting work details", error);
    }
  };

  return (
    <section>
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
      {/* Profile info */}
      <div className="md:grid-cols-12 grid gap-4 mt-5 ">
        <div className="slot smallContainer radius md:col-span-4 flex items-center">
          <div className="">
            <div className="md:h-24 md:w-24 h-16 w-16 bg-white rounded-full overflow-hidden text-black text-3xl flex justify-center items-center">
              <img src={employeeProfile?.avatar} alt={employeeProfile?.name} />
            </div>
          </div>
          <div className="ms-10 md:ms-20">
            <div className="">
              <h6 className="headerText">{employeeProfile?.name}</h6>
            </div>
            <div className="headerText">
              <h6 className=" subText">{employeeProfile?.phoneNumber}</h6>
            </div>
          </div>
        </div>
        <div className="slot smallContainer radius flex items-center md:col-span-4">
          <div>
            <div className="headerText flex">
              <h6 className="">Emp. Type</h6>
              <p className="ms-6 subText flex justify-center items-center">
                {employeeProfile?.role}
              </p>
            </div>
            <div className="headerText flex">
              <h6 className="">AADHAR CARD</h6>
              <p className="ms-6 subText flex justify-center items-center">
                {employeeProfile?.employeeDetails?.aadharnumber}
              </p>
            </div>
          </div>
        </div>
        <div className="slot smallContainer radius md:col-span-2">
          <div className="headerText">
            <h6 className="">Advance</h6>
            <p className="slotNumbers text-5xl">
              {employeeProfile?.employeeDetails?.advance &&
                FormatNumber(employeeProfile?.employeeDetails?.advance)}
            </p>
          </div>
        </div>
      </div>
      {/* Form */}
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="bg-[#0b0b0b] border border-[#1b1b1b] smallContainer mt-5 radius">
          <div className="flex flex-wrap">
            <div className="flex justify-between items-center gap-4">
              <label className="text-white text-lg">Amount</label>
              <input
                type="number"
                className="inputBox"
                value={amount}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="myBtn mt-5">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdvanceMoney;
