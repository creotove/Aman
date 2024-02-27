import React, { useState } from "react";
import Modal from "../components/newCreated/Modal";
import { useLocation } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import axios from "../apis/admin";
import FormatSlotNumber from "../components/newCreated/FormatSlotNumber";
import DateFormatter from "../components/newCreated/DateFormatter";

const CustomerProfile = () => {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const [customerProfile, customerProfileError, customerProfileLoading] =
    useAxios({
      axiosInstance: axios,
      method: "GET",
      url: `/customer/${id}`,
      requestConfig: {
        headers: {
          "Content-Language": "en-US",
        },
      },
    });

  return (
    <>
      <section className="text-white relative">
        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-end gap-4">
          <button className="myBtn radius ">View Measurement</button>
          <button className="myBtn radius ">Update</button>
          <button className="myBtn radius ">Delete</button>
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
            <h1 classname="">Purchased Bill</h1>
            <p className="text-8xl text-center slotNumbers">
              {FormatSlotNumber(customerProfile?.purchasedBillCount)}
            </p>
          </div>
          <div className="radius md:col-span-2 slot  smallContainer">
            <h1 classname="">Stitched Bill</h1>
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
