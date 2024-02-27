import React from "react";
import WorkList from "../components/newCreated/WorkList";
import MoneyGivenList from "../components/newCreated/MoneyGivenList";
import FormatNumber from "../components/newCreated/FormatNumber";
import useAxios from "../hooks/useAxios";
import axios from "../apis/admin";
import { useLocation, useParams } from "react-router-dom";

const EmployeeProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const [employeeProfile, employeeProfileError, employeeProfileLoading] =
    useAxios({
      axiosInstance: axios,
      method: "GET",
      url: `/employee/${id}?role=${location.state}`,
      requestConfig: {
        headers: {
          "Content-Language": "en-US",
        },
      },
    });
  return (
    <section className="text-white relative">
      {/* Actions */}
      <div className="flex flex-col md:flex-row justify-end gap-4">
        <button className="myBtn radius ">Add work</button>
        <button className="myBtn radius ">Give Money</button>
      </div>

      {/* Personal Info */}
      <div className="md:grid-cols-12 grid gap-4 mt-5 ">
        <div className="slot smallContainer radius md:col-span-4 flex items-center">
          <div className="">
            <div className="md:h-24 md:w-24 h-16 w-16 bg-white rounded-full overflow-hidden text-black text-3xl flex justify-center items-center">
              <img src={employeeProfile?.avatar} alt={employeeProfile?.name} />
            </div>
          </div>
          <div className="ms-10 md:ms-20">
            <div className="">
              <h6 className="headerText">{employeeProfile?.name}</h6>
            </div>
            <div className="">
              <h6 className="headerText">{employeeProfile?.phoneNumber}</h6>
            </div>
          </div>
        </div>
        <div className="slot smallContainer radius flex items-center md:col-span-4">
          <div>
            <div className="headerText flex">
              <h6 className="">Emp. Type</h6>
              <p className="ms-6 subText flex justify-center items-center">
                {employeeProfile?.role}
              </p>
            </div>
            <div className="headerText flex">
              <h6 className="">AADHAR CARD</h6>
              <p className="ms-6 subText flex justify-center items-center">
                {employeeProfile?.employeeDetails?.aadharnumber}
              </p>
            </div>
          </div>
        </div>
        <div className="slot smallContainer radius md:col-span-2">
          <div className="">
            <h6 className="headerText">
              {employeeProfile?.role !== "HELPER" ? "Earned" : "Salary"}
            </h6>
            <p className="slotNumbers text-5xl">
              {employeeProfile?.employeeDetails?.earned &&
                FormatNumber(employeeProfile?.employeeDetails?.earned)}
            </p>
          </div>
        </div>
        <div className="slot smallContainer radius md:col-span-2">
          <div className="headerText">
            <h6 className="">Advance</h6>
            <p className="slotNumbers text-5xl">
              {employeeProfile?.employeeDetails?.advance &&
                FormatNumber(employeeProfile?.employeeDetails?.advance)}
            </p>
          </div>
        </div>
      </div>

      {/* Works */}
      <div className="md:grid-cols-12 grid gap-4 mt-5">
        <div className="max-h-[32rem] no-scrollbar overflow-y-auto min-h-[30rem] slot smallContainer radius md:col-span-8 ">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className="text-xs inputBox subText uppercase">
                <tr className="">
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Earned
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {employeeProfile &&
                  employeeProfile?.workDetails.map((work, i) => {
                    return (
                      <WorkList
                        id={work._id}
                        key={work._id}
                        index={i}
                        date={work.createdAt}
                        earned={work.totalAmount}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="max-h-[32rem] no-scrollbar overflow-y-auto min-h-[30rem] slot smallContainer radius md:col-span-4">
          <MoneyGivenList />
        </div>
      </div>
    </section>
  );
};

export default EmployeeProfile;
