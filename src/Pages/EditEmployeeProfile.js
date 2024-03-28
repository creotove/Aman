import axios from "../apis/admin";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditEmployeeProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeProfile = location.state?.employeeProfile;
  const [name, setName] = useState(employeeProfile?.name);
  const [adharCard, setAdharCard] = useState(
    employeeProfile?.employeeDetails?.aadharnumber
  );
  
  const [employeeAmts, setEmployeeAmts] = useState(
    employeeProfile?.employeeDetails?.cuttingAmounts ||
      employeeProfile?.employeeDetails?.stitchingAmounts ||
      {}
  );
  const [monthly, setMonthly] = useState(
    employeeProfile?.employeeDetails?.monthly || 0
  );

  const handleSave = async () => {
    const dataToSubmit = {
      name,
      employeeDetails: {
        aadharnumber: adharCard,
        employeeAmts: monthly === 0 ? employeeAmts : { monthly },
      },
    };

    try {
      const res = await axios.patch(
        `/updateEmployee/${employeeProfile?._id}`,
        dataToSubmit
      );
      if (res.data.success) {
        // Show a success message
        console.log("Employee profile updated successfully");
        navigate("/employees");
      }
    } catch (error) {
      console.error("Error updating employee profile", error);
    }
  };

  return (
    <section>
      <div className="md:col-span-6 bg-[#0b0b0b] border border-[#1b1b1b] smallContainer radius">
        <h2 className="text-2xl">Personal details</h2>
        <div className="flex flex-wrap gap-4 ">
          {/* Name */}
          <div className="mt-3 flex flex-col">
            <label className="ms-1 block">Employee name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="inputBox w-48 md:w-60 me-auto md:me-0"
              placeholder="Employee's name"
            />
          </div>
          {/* phone number */}
          <div className="mt-3 flex flex-col">
            <label className="ms-1 flex">
              Phone number<p className="text-[#FC3447] ms-1">*Not Editable</p>
            </label>
            <input
              type="text"
              value={employeeProfile?.phoneNumber}
              className="inputBox w-48 md:w-60 me-auto md:me-0"
              placeholder="Customer's phone number"
              readOnly
            />
          </div>
          {/* AdharCard number */}
          <div className="mt-3 flex flex-col">
            <label className="ms-1 block">AdharCard number</label>
            <input
              type="number"
              value={adharCard}
              className="inputBox w-48 md:w-60 me-auto md:me-0"
              placeholder="AdharCard number"
              onChange={(e) => setAdharCard(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* Employee Work Amounts */}
      {
        (employeeProfile.role === "HELPER" ? (
          <div className="md:col-span-6 bg-[#0b0b0b] border border-[#1b1b1b] smallContainer radius mt-5">
            <label className="ms-1">Employee Amounts</label>
            <div className="flex gap-4 flex-wrap">
              <div className="mt-3 flex flex-col">
                <label className="ms-1 block">Monthly Salary</label>
                <input
                  type="number"
                  value={monthly}
                  className="inputBox w-48 md:w-60 me-auto md:me-0"
                  placeholder="Amount"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setMonthly(parseInt(e.target.value, 10))}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="md:col-span-6 bg-[#0b0b0b] border border-[#1b1b1b] smallContainer radius mt-5">
            <label className="ms-1">Employee Amounts</label>
            <div className="flex gap-4 flex-wrap">
              {Object.entries(employeeAmts).map(([key, value]) => (
                <div className="mt-3 flex flex-col" key={key}>
                  <label className="ms-1 block">{key}</label>
                  <input
                    type="number"
                    value={value}
                    className="inputBox w-48 md:w-60 me-auto md:me-0"
                    placeholder="Amount"
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      setEmployeeAmts({
                        ...employeeAmts,
                        [key]: parseInt(e.target.value, 10),
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      }

      <div className="flex justify-end mt-5">
        <button className="myBtn" onClick={handleSave}>
          Save
        </button>
      </div>
    </section>
  );
};

export default EditEmployeeProfile;
