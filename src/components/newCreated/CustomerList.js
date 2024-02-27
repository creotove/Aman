import React from "react";
import { useNavigate } from "react-router-dom";

const CustomerList = ({ name, phoneNumber, avatar,customerId }) => {
  const navigate = useNavigate();
  return (
    <div className="inputBox p-3 radius text-white flex items-center gap-4 mb-1 cursor-pointer"
      onClick = {()=>navigate(`/customers/${customerId}`, { state: { id: customerId } })}

    >
      <div className="rounded-full bg-neutral-900  w-11 h-11 ms-2 overflow-hidden">
        <img
          src={avatar}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <p className="headerText">{name}</p>
        <p className="subText">{phoneNumber}</p>
      </div>
      <div className="ms-auto">
        <svg
          className="h-3"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 2L17 12L7 22" stroke="#D9D9D9" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
};

export default CustomerList;
