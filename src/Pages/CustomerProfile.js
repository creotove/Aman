import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import axios from "../apis/admin";
import FormatSlotNumber from "../components/newCreated/FormatSlotNumber";
import DateFormatter from "../components/newCreated/DateFormatter";
import Modal from "../components/newCreated/Modal";
import MeasurementAccordian from "../components/newCreated/MeasurementAccordian";
import useToast from "../hooks/useToast";
import Toast from "../components/newCreated/Toast";

const CustomerProfile = () => {
  const location = useLocation();
  const { id } = location.state;
  const [modalState, setModalState] = useState(false);
  const [customerProfile, error] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `/customer/${id}`,
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  });

  const {
    showToast,
    setShowToast,
    toastMsg,
    setToastMsg,
    setToastType,
    toastType,
    showToastMessage,
  } = useToast();
  // Accordian
  const [accordions, setAccordion] = useState([]);
  const toggleAccordion = (accordionkey) => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord.key === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen };
      } else {
        return { ...accord, isOpen: false };
      }
    });

    setAccordion(updatedAccordions);
  };
  useEffect(() => {
    const newAccordions =
      customerProfile?.measurements &&
      customerProfile?.measurements.map((item, i) => {
        return {
          key: i + 1,
          name: item.name,
          measurements: item.measurements,
          stitchingAmtCustomer: item.stitchingAmtCustomer,
          stitchingAmtTailor: item.stitchingAmtTailor,
          cuttingAmt: item.cuttingAmt,
          isOpen: false,
        };
      });
    setAccordion(newAccordions);
    if (error) {
      setShowToast(true);
      setToastMsg(error);
      setToastType("error");
    }
  }, [customerProfile, error]);
  return (
    <>
      {showToast && (
        <Toast
          message={toastMsg}
          type={toastType}
          showToastMessage={showToastMessage}
        />
      )}
      <section className="text-white relative">
        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-end gap-4">
          {customerProfile && customerProfile?.measurements?.length > 0 && (
            <button
              className="myBtn radius"
              onClick={() => setModalState(true)}
            >
              View Measurement
            </button>
          )}
          <Modal
            title={"Customer Measurements"}
            modalState={modalState}
            setModalState={setModalState}
          >
            <div className="flex justify-center items-center">
              <div className="grid md:grid-cols-12 w-full gap-4 ">
                {accordions &&
                  accordions.map((accordion) => (
                    <MeasurementAccordian
                      key={accordion.key}
                      isOpen={accordion.isOpen}
                      toggleAccordion={() => toggleAccordion(accordion.key)}
                      name={accordion.name}
                      measurements={accordion.measurements}
                    />
                  ))}
              </div>
            </div>
          </Modal>
          <button className="myBtn radius ">Update</button>
          <button className="delete deleteBtn radius ">Delete</button>
        </div>

        {/* Personal Info */}
        <div className="md:grid-cols-12 grid gap-4 mt-5 ">
          <div className="slot smallContainer radius md:col-span-4 flex items-center">
            <div className="">
              <div className="md:h-24 md:w-24 h-16 w-16 bg-white rounded-full overflow-hidden text-black text-3xl">
                <img
                  src={customerProfile?.avatar}
                  alt={customerProfile?.name.charAt(0)}
                />
              </div>
            </div>
            <div className="ms-10 md:ms-20">
              <div className="">
                <h6 className="headerText">{customerProfile?.name}</h6>
              </div>
              <div className="">
                <h6 className="headerText">{customerProfile?.phoneNumber}</h6>
              </div>
            </div>
          </div>

          <div className="radius md:col-span-2 slot  smallContainer">
            <h1 className="">Purchased Bill</h1>
            <p className="text-8xl text-center slotNumbers">
              {FormatSlotNumber(customerProfile?.purchasedBillCount)}
            </p>
          </div>
          <div className="radius md:col-span-2 slot  smallContainer">
            <h1 className="">Stitched Bill</h1>
            <p className="text-8xl text-center slotNumbers">
              {FormatSlotNumber(customerProfile?.stitchedBillCount)}
            </p>
          </div>
        </div>

        {/* Recent Bills */}
        <div className="md:grid-cols-12 grid gap-4 mt-5">
          <div className="max-h-[32rem] no-scrollbar overflow-y-auto min-h-[30rem] slot smallContainer radius md:col-span-8">
            <h2 className="headerText">Recent Bills</h2>
            <table className="w-full  text-sm text-left rtl:text-right mt-5">
              <thead className="text-xs inputBox  uppercase">
                <tr className="subText">
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {customerProfile &&
                  customerProfile?.recentBill?.length > 0 &&
                  customerProfile?.recentBill?.map((bill, index) => (
                    <tr className="" key={index}>
                      <td className="px-6 py-1">{index + 1}</td>
                      <td className="px-6 py-1 whitespace-nowrap">
                        {DateFormatter(bill.createdAt)}
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap subText"
                      >
                        {bill.billType}
                      </th>
                      <td className="px-6 py-1">
                        {bill.totalAmt || bill.finalAmt}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerProfile;
