import React, { useEffect, useState } from "react";
import EmployeeList from "../components/newCreated/EmployeeList";
import SearchBar from "../components/newCreated/SearchBar";
import Toast from "../components/newCreated/Toast";
import useToast from "../hooks/useToast";
import useSearchBar from "../hooks/useSearchBar";
import SearchedCustomer from "../components/newCreated/SearchedCustomer";
import axios from "../apis/admin";
import { NavLink } from "react-router-dom";

const Employees = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeListLoading, setEmployeeListLoading] = useState(true);

  const getEmployeeList = async () => {
    try {
      const res = await axios.get("/employees");
      if (res.data.success) {
        const data = res.data.data;
        if (data && data.length > 0) {
          setEmployeeList(data);
        } else {
          setEmployeeList([]);
        }
      }
    } catch (error) {
      console.error("Error fetching employees", error);
      setShowToast(true);
      setToastMsg("Error fetching employees");
      setToastType("error");
    } finally {
      setEmployeeListLoading(false);
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
  const { identifier, setIdentifier, searchState, setSearchState } =
    useSearchBar();
  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!identifier) {
      setShowToast(true);
      setToastMsg("Enter phone number !");
      setToastType("error");
      return;
    }
    if (identifier.length < 10) {
      setShowToast(true);
      setToastMsg("Enter valid phone number !");
      setToastType("error");
      return;
    }
    setSearchState(true);
    setShowToast(true);
    setToastMsg("Employee found !");
    setToastType("success");
    return;
  };
  useEffect(() => {
    getEmployeeList();
  }, []);
  return (
    <section
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSearchState(false);
        setIdentifier("");
      }}
    >
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
      {/* search bar */}
      <SearchBar
        placeHolderText={"Enter mobile number"}
        buttonText={""}
        identifier={identifier}
        setIdentifier={setIdentifier}
        handleSearch={handleSearch}
      />
      {/* searched result slot */}
      {searchState ? <SearchedCustomer /> : null}

      <div className="grid md:grid-cols-12 gap-4 mt-5 ">
        <div className="slot md:col-span-5 radiusmax-h-[32rem] no-scrollbar overflow-y-auto min-h-[30rem] smallContainer radius">
          <h3 className="headerText mb-3 ">Employee List</h3>
          {employeeListLoading
            ? "Loading"
            : employeeList &&
              employeeList.length > 0 ?
              employeeList.map((employee) => (
                <EmployeeList
                  name={employee.name}
                  role={employee.role}
                  avatar={employee.avatar}
                  key={employee._id}
                  _id={employee._id}
                />
              )) :
              <div className="flex justify-center items-center h-full">
                <p className="text-[#FC3447]">No employee found</p>
              </div>
          }
        </div>
        {/* <div className="md:col-span-4 gap-4 flex flex-col min-h-[30rem]">
          <div className="radius md:col-span-1 min-w-[10rem] md:min-h-[10rem] min-h-[15rem] max-h-[15rem] slot smallContainer">
            <h3 className="">Salary Remaining to give</h3>
          </div>
          <div className="radius md:col-span-1 min-w-[10rem] md:min-h-[10rem] min-h-[15rem] max-h-[15rem] slot smallContainer">
            <h3 className="">Total advance salary given</h3>
          </div>
          <div className="radius md:col-span-1 min-w-[10rem] md:min-h-[10rem] min-h-[15rem] max-h-[15rem] slot smallContainer">
            <h3 className="">Salary this month</h3>
          </div>
        </div>*/}
        <div className="md:col-span-3 min-h-[30rem] slot smallContainer radius">
          <h3 className="text-[#FC3447]">*Important Links</h3>
          <div className="flex flex-col gap-4 mt-2">
            <NavLink className="myLink" to="new-employee">
              New Employee
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Employees;
