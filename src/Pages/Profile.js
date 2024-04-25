import React, { useState } from "react";
import Modal from "../components/newCreated/Modal";
import useToast from "../hooks/useToast";
import Toast from "../components/newCreated/Toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [password, setPassword] = useState("");
  const [modalState, setModalState] = useState(false);
  const [securityCode, setSecurityCode] = useState("");
  const navigate = useNavigate();
  const {
    showToast,
    setShowToast,
    setToastMsg,
    setToastType,
    toastMsg,
    toastType,
  } = useToast();

  const validateSecurityCode = (securityCode) => {
    if (securityCode === "1234") {
      setShowToast(true);
      setToastMsg("Password Changed Successfully");
      setToastType("success");
      setPassword("");      
      setModalState(false);
    } else {
      setShowToast(true);
      setToastMsg("Invalid Security Code");
      setToastType("error");
      setSecurityCode("");
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
          <div className="flex justify-center items-center gap-8">
          <div className="mt-3 flex gap-4">
          <input
            type="text"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
            className="inputBox w-48 md:w-60 me-auto md:me-0"
            placeholder="New password"
          />
          <button
            className="myBtn"
            onClick={() => {
             validateSecurityCode(securityCode);
            }}
          >
            Save
          </button>
        </div>
          </div>
        </Modal>
      )}
      <div className="flex flex-wrap gap-4 bg-[#0b0b0b] border border-[#1b1b1b] smallContainer radius">
        {/* Password */}
        <div className="mt-3 flex gap-4">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputBox w-48 md:w-60 me-auto md:me-0"
            placeholder="New password"
          />
          <button
            className="myBtn"
            onClick={() => {
              setModalState(true);
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button className="delete deleteBtn" onClick={()=>navigate('/login')} >Logout</button>
      </div>
    </section>
  );
};

export default Profile;
