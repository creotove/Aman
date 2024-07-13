import React, { useState } from "react";
import Modal from "../components/newCreated/Modal";
import useToast from "../hooks/useToast";
import Toast from "../components/newCreated/Toast";
import { useNavigate } from "react-router-dom";
import axios from "../apis/admin";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const [password, setPassword] = useState("");
  const [modalState, setModalState] = useState(false);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogout = async () => {
    try {
      const res = await axios.post('/logout');
      if (res.data.success) {
        navigate("/login");
        setAuth({ user: null });
      }

    } catch (error) {
      setShowToast(true);
      setToastMsg(error?.response?.data?.message || error?.message);
      setToastType("error");
      console.log(error);
    }
  };
  const {
    showToast,
    setShowToast,
    setToastMsg,
    setToastType,
    toastMsg,
    toastType,
  } = useToast();

  const validateOTP = async (otp) => {
    try {
      if (otp === "") {
        setShowToast(true);
        setToastMsg("Please enter security code");
        setToastType("error");
        return;
      } else {
        const res = await axios.post("/validateOTP", { otp, password });
        if (res.data.success) {
          setShowToast(true);
          setToastMsg("Password changed successfully");
          setToastType("success");
          setModalState(false);
          setPassword("");
          setOTP("");
        } else {
          setShowToast(true);
          setToastMsg("Invalid OTP");
          setToastType("error");
        }
      }
    } catch (error) {
      console.log(error);
      setShowToast(true);
      setToastMsg(error?.response?.data?.message || error?.message);
      setToastType("error");
    }
  };
  const sendOtptoEmail = async () => {
    try {
      const res = await axios.post("/sendOTP");
      if (res.data.success) {
        setShowToast(true);
        setToastMsg("OTP sent successfully");
        setToastType("success");
        setModalState(true);
      }
    } catch (error) {
      console.log(error);
      setShowToast(true);
      setToastMsg(error?.response?.data?.message || error?.message);
      setToastType("error");
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
      {modalState && (
        <Modal
          title={"Enter Security Code to change password"}
          modalState={modalState}
          setModalState={setModalState}
        >
          <div className="flex justify-center flex-col items-start gap-8">
            <div className="flex flex-col">
              <label className="text-white">New Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0"
                placeholder="New password"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0"
                placeholder="OTP"
              />
            </div>
            <button
              className="myBtn-success"
              onClick={() => {
                validateOTP(otp);
              }}
            >
              Save
            </button>
          </div>
        </Modal>
      )}
      <div className="flex flex-wrap gap-4 bg-[#0b0b0b] border border-[#1b1b1b] smallContainer radius">
        {/* Password */}
        <div className="mt-3 flex gap-4">
          <button
            className="myBtn"
            onClick={() => {
              sendOtptoEmail();
              // setModalState(true);
            }}
          >
            Change Password
          </button>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button
          className="delete deleteBtn"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default Profile;
