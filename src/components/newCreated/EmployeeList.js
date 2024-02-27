import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeList = ({name,role,avatar,_id}) => {
  const navigate = useNavigate()
  return (
    <div className="inputBox p-3 radius text-white flex items-center gap-4 mb-1 cursor-pointer"
    onClick={()=>navigate(`/employees/${_id}`, {state: role.toUpperCase()})}
    >
      <div className="rounded-full bg-neutral-900  w-11 h-11 ms-2 overflow-hidden">
      <img src={avatar} alt={name} />
      </div>
      <div className="flex flex-col">
        <p className="headerText">{name}</p>
        <p className="subText">{role}</p>
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
          <path d="M7 2L17 12L7 22" stroke="#D9D9D9" stroke-width="3" />
        </svg>
      </div>
    </div>
  );
};

export default EmployeeList;
