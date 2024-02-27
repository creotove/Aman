import React, { useEffect } from "react";
import EmployeeList from "../components/newCreated/EmployeeList";
import SearchBar from "../components/newCreated/SearchBar";
import Toast from "../components/newCreated/Toast";
import useToast from "../hooks/useToast";
import useAxios from "../hooks/useAxios";
import useSearchBar from "../hooks/useSearchBar";
import SearchedCustomer from "../components/newCreated/SearchedCustomer";
import axios from "../apis/admin";

const Employees = () => {
  const [employeeList, employeeListError, employeeListLoading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/employees",
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  });
  const {
    showToast,
    setShowToast,
    setToastMsg,
    setToastType,
    toastMsg,
    toastType,
  } = useToast();
  const { phoneNumber, setPhoneNumber, searchState, setSearchState } =
    useSearchBar();
  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!phoneNumber) {
      setShowToast(true);
      setToastMsg("Enter phone number !");
      setToastType("error");
      return;
    }
    if (phoneNumber.length < 10) {
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
    employeeListError && setShowToast(true);
    employeeListError && setToastMsg(employeeListError);
    employeeListError && setToastType("error");
  });
  return (
    <section
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSearchState(false);
        setPhoneNumber("");
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
        buttonText={"Employee mgmt."}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        handleSearch={handleSearch}
      />
      {/* searched result slot */}
      {searchState ? <SearchedCustomer /> : null}

      <div className="grid grid-cols-12 gap-4 mt-5 ">
        <div className="slot col-span-12 md:col-span-5 radius  max-h-[32rem] no-scrollbar overflow-y-auto min-h-[30rem] smallContainer">
          <div className="radius  flex justify-end ">
            <select className="myBtn">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <h1 className="headerText mb-3 ">Employee List</h1>
          {employeeListLoading
            ? "Loading"
            : employeeList &&
              employeeList.map((employee) => 
                <EmployeeList
                  name={employee.name}
                  role={employee.role}
                  avatar={employee.avatar}
                  key={employee._id}
                  _id={employee._id}
                />
              )}
        </div>
        <div className="col-span-12 md:col-span-7 min-h-[30rem]">
          <div className="text-white">
            <div>
              <div className="grid lg:grid-cols-2 gap-4">
                {/* <div className="headerText flex justify-center items-center radius md:col-span-1 min-w-[10rem] md:min-h-[10rem] min-h-[15rem] max-h-[15rem] slot cursor-pointer  smallContainer">
                  <h1 classname="">Give Money</h1>
                </div> */}
                <div className="radius md:col-span-1 min-w-[10rem] md:min-h-[10rem] min-h-[15rem] max-h-[15rem] slot  smallContainer">
                  <h1 classname="">Salary Remaining to give</h1>
                </div>
              </div>
              <div className=" grid lg:grid-cols-2 gap-4 mt-4">
                {/* <div className="headerText flex justify-center items-center radius md:col-span-1 min-w-[10rem] md:min-h-[10rem] min-h-[15rem] max-h-[15rem] slot  cursor-pointer smallContainer">
                  <h1 classname="">Add work</h1>
                </div> */}
                <div className="radius md:col-span-1 min-w-[10rem] md:min-h-[10rem] min-h-[15rem] max-h-[15rem] slot  smallContainer">
                  <h1 classname="">Total advance salary given</h1>
                </div>
              </div>
              <div className=" grid lg:grid-cols-2 gap-4 mt-4">
                {/* <div className="headerText flex justify-center items-center radius md:col-span-1 min-w-[10rem] md:min-h-[10rem] min-h-[15rem] max-h-[15rem] slot cursor-pointer  smallContainer">
                  <h1 classname="">Give Advance</h1>
                </div> */}
                <div className="radius md:col-span-1 min-w-[10rem] md:min-h-[10rem] min-h-[15rem] max-h-[15rem] slot  smallContainer">
                  <h1 classname="">Salary this month</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Employees;
