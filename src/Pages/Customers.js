import React from "react";
import SearchBar from "../components/newCreated/SearchBar";
import Toast from "../components/newCreated/Toast";
import SearchedCustomer from "../components/newCreated/SearchedCustomer";
import CustomerList from "../components/newCreated/CustomerList";
import useToast from "../hooks/useToast";
import useSearchBar from "../hooks/useSearchBar";
import axios from "../apis/admin";
import useAxios from "../hooks/useAxios";
import ChooseBill from "../components/newCreated/ChooseBill";
// import useAxiosFx from "../hooks/useAxiosFx";

const Customers = () => {
  const [customer, setCustomer] = React.useState(null);
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
  const handleSearch = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!phoneNumber) {
      setShowToast(true);
      setToastMsg("Enter phone number !");
      setToastType("error");
      return;
    }
    try {
      const res = await axios.get(
        `/customer?phoneNumber=${phoneNumber}&name=${phoneNumber}`
      );
      if (res.data.success) {
        setSearchState(true);
        setCustomer(res.data.data);
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
        buttonText={"Customer mgmt."}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        handleSearch={handleSearch}
      />
      {/* searched result slot */}
      {searchState && customer ? (
        <SearchedCustomer
          userId={customer._id}
          customerId={customer.customer_id}
          avatar={customer.avatar}
          name={customer.name}
          phoneNumber={customer.phoneNumber}
        />
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
                phoneNumber={stitchCustomer.phoneNumber}
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
                phoneNumber={soldCustomer.phoneNumber}
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
// overflow-y-scroll no-scrollbar
// overflow-y-scroll no-scrollbar
