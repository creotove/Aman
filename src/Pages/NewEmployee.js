import axios from "../apis/admin";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewEmployee = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aadharnumber, setAadharNumber] = useState("");
  const [role, setRole] = useState("CM");
  const [monthly, setMonthly] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const data = { name, phoneNumber, role, aadharnumber, monthly, avatar };
      console.log(data);
      const res = await axios.post("/employee", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        navigate("/employees");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#0b0b0b] border border-[#1b1b1b] smallContainer radius">
      <form>
        <div className="flex flex-wrap gap-4">
          {/* Name */}
          <div className="mt-3 flex flex-col">
            <label className="ms-1 w-full">Employee name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="inputBox w-48 md:w-60 me-auto md:me-0 "
              placeholder="Employee's name"
            />
          </div>
          {/* Phone Number */}
          <div className="mt-3 flex flex-col">
            <label className="ms-1 w-full">Phone number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="inputBox w-48 md:w-60 me-auto md:me-0 "
              placeholder="Phone number"
            />
          </div>
          {/* Aadhar Number */}
          <div className="mt-3 flex flex-col">
            <label className="ms-1 w-full">Aadhar number</label>
            <input
              type="text"
              value={aadharnumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              className="inputBox w-48 md:w-60 me-auto md:me-0 "
              placeholder="Aadhar number"
            />
          </div>
          {/* Role */}
          <div className="mt-3 flex flex-col">
            <label className="ms-1 w-full">Role</label>
            <select
              onChange={(e) => setRole(e.target.value)}
              className="inputBox w-48 md:w-60 me-auto md:me-0 "
            >
              <option value="CM">Cutting Master</option>
              <option value="TAILOR">Tailor</option>
              <option value="HELPER">Helper</option>
            </select>
          </div>
          {/* Monthly */}
          {role === "HELPER" && (
            <div className="mt-3 flex flex-col mb-2">
              <label className="ms-1 w-full">Monthly Salary</label>
              <input
                type="text"
                value={monthly}
                onChange={(e) => setMonthly(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Monthly Salary"
              />
            </div>
          )}
          {/* Avatar */}
          <div className="mt-3 flex flex-col">
            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="hidden "
              id="avatar"
              placeholder="Aadhar number"
            />
            <div
              className="mt-3 radius border border-dashed flex flex-col items-center gap-2 p-5 cursor-pointer"
              onClick={() => document.getElementById("avatar").click()}
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7822 9.00195C19.9572 9.01395 21.1352 9.11095 21.9032 9.87895C22.7822 10.758 22.7822 12.172 22.7822 15V16C22.7822 18.829 22.7822 20.243 21.9032 21.122C21.0252 22 19.6102 22 16.7822 22H8.78223C5.95423 22 4.53923 22 3.66123 21.122C2.78223 20.242 2.78223 18.829 2.78223 16V15C2.78223 12.172 2.78223 10.758 3.66123 9.87895C4.42923 9.11095 5.60723 9.01395 7.78223 9.00195"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12.7822 15V2M12.7822 2L15.7822 5.5M12.7822 2L9.78223 5.5"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p style={{ marginVertical: "2rem" }}>Browse Files</p>
              <p>upload the employee profile</p>
            </div>
          </div>
        </div>

        <div className="justify-end flex mt-5">
          <button className="myBtn" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEmployee;
