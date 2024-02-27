import React from "react";

const MoneyGivenList = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full  text-sm text-left rtl:text-right ">
        <thead className="text-xs inputBox subText uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="px-6 py-1">1</td>
            <td className="px-6 py-1 whitespace-nowrap">24-07-23</td>

            <td className="px-6 py-1">$2999</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MoneyGivenList;
