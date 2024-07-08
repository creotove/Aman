import React, { useState } from "react";
import SearchBar from "../components/newCreated/SearchBar";
import Toast from "../components/newCreated/Toast";
import SearchedCustomer from "../components/newCreated/SearchedCustomer";
import CustomerList from "../components/newCreated/CustomerList";
import useToast from "../hooks/useToast";
import useSearchBar from "../hooks/useSearchBar";
import axios from "../apis/admin";
import useAxios from "../hooks/useAxios";

const Customers = () => {
  const [customer, setCustomer] = useState(null);
  const {
    showToast,
    setShowToast,
    setToastMsg,
    setToastType,
    toastMsg,
    toastType,
  } = useToast();
  const [customerList, setCustomerList] = useState([]);
  const { identifier, setIdentifier, searchState, setSearchState } =
    useSearchBar();
  const handleSearch = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!identifier) {
      setShowToast(true);
      setToastMsg("Enter a valid phone number or name!");
      setToastType("error");
      return;
    }
    try {
      const isPhoneNumber = /^\d+$/.test(identifier);
      let res;
      if (isPhoneNumber) {
        res = await axios.get(
          `/searchCustomerBasedOnPhoneNumber/${identifier}`
        );
      } else {
        res = await axios.get(
          `/searchCustomersBasedOnName/${identifier}`
        );
      }
      if (res.data.success) {
        setSearchState(true);
        if (isPhoneNumber) {
          setCustomer(res.data.data);
          setCustomerList([]);
        } else {
          setCustomerList(res.data.data);
          setCustomer(null);
        }
      }
    } catch (error) {
      setShowToast(true);
      setToastMsg("Customer not found!");
      setToastType("error");
      setSearchState(false);
    }
  };

  const [
    stitchCustomerList,
    stitchCustomerListError,
    stitchCustomerListLoading,
  ] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/stitchCustomerList",
  });
  const [soldCustomerList, soldCustomerListError, soldCustomerListLoading] =
    useAxios({
      axiosInstance: axios,
      method: "GET",
      url: "/soldCustomerList",
    });

  return (
    <section
      className="relative"
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
        buttonText={"Customer mgmt."}
        identifier={identifier}
        setIdentifier={setIdentifier}
        handleSearch={handleSearch}
      />
      {/* searched result slot */}
      {searchState && customer ? (
        <SearchedCustomer
          userId={customer._id}
          customerId={customer.customer_id}
          avatar={customer.avatar}
          name={customer.name}
          identifier={customer.identifier}
        />
      ) : null}
      {searchState && customerList.length > 0 ? (
        customerList.map((customer) => (
          <SearchedCustomer
            key={customer._id}
            userId={customer._id}
            customerId={customer.customer_id}
            avatar={customer.avatar}
            name={customer.name}
            identifier={customer.identifier}
          />
        ))
      ) : null}


      <div className="grid md:grid-cols-12 gap-4 mt-5">
        <div className="md:col-span-4  radius slot min-h-screen shadow-sm smallContainer">
          <h1 className="headerText">
            Stitched Bill Customer{" "}
            <span className="text-sm text-neutral-400 font-normal">
              (Recent)
            </span>
          </h1>
          {stitchCustomerList?.data &&
            stitchCustomerList?.data.length > 0 &&
            !stitchCustomerListLoading &&
            !stitchCustomerListError ? (
            stitchCustomerList?.data?.map((stitchCustomer, index) => (
              <CustomerList
                key={index}
                name={stitchCustomer.name}
                identifier={stitchCustomer.identifier}
                avatar={stitchCustomer.avatar}
                customerId={stitchCustomer.customer_id}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-[#FC3447]">No Customer's found</p>
            </div>
          )}
        </div>
        <div className="md:col-span-4  radius slot min-h-screen shadow-sm smallContainer">
          <h1 className="headerText mb-3">
            Sold Bill Customer{" "}
            <span className="text-sm text-neutral-400 font-normal">
              (Recent)
            </span>
          </h1>
          {soldCustomerList?.data &&
            soldCustomerList?.data.length > 0 &&
            !soldCustomerListLoading &&
            !soldCustomerListError ? (
            soldCustomerList?.data?.map((soldCustomer) => (
              <CustomerList
                key={soldCustomer._id}
                name={soldCustomer.name}
                identifier={soldCustomer.identifier}
                avatar={soldCustomer.avatar}
                customerId={soldCustomer.customer_id}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-[#FC3447]">No Customer's found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Customers;
