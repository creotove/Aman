import React from 'react'
import DateFormatter from './DateFormatter'
import { RUPEE_SYMBOL } from '../../Constants/Index'

const DisplayWork = ({work}) => {
  return (
    <section className="">
    <div className="mb-1 text-white">
      <div className="w-full slot p-4 rounded-t-3xl">
        <p className="headerText text-end">
          {DateFormatter(work.createdAt)}
        </p>
      </div>
      <div className="mb-1 text-white">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs inputBox subText uppercase">
            <tr className="headerText">
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Clothing
              </th>
              <th scope="col" className="px-6 py-3">
                Qty.
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Per pcs.
              </th>{" "}
              <th scope="col" className="px-6 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(work.work).map(([key, value], i) => (
              <tr key={value._id} className="slot p-3">
                <td className="px-6 py-1 text-center">{i + 1}</td>
                <td className="px-6 py-1 text-center">{key.toUpperCase()}</td>
                <td className="px-6 py-1 text-center">{value.quantity}</td>
                <td className="px-6 py-1 text-center">{value.perPiece}</td>
                <td className="px-6 py-1 text-center">{RUPEE_SYMBOL + value.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="slot rounded-b-3xl">
          <div className="p-5">
            <p className="text-3xl text-end text-green-500">
              {RUPEE_SYMBOL + work.totalAmount}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default DisplayWork