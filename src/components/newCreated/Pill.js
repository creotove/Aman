import React from 'react'

const Pill = ({measurementName,handleRemove,index}) => {
  return (
    <div className="w-min pill radius h-min bg-red-200">
    <div className="flex justify-evenly items-center">
      <div className="me-2 whitespace-nowrap">{measurementName}</div>
      <button onClick={()=>handleRemove(index)} className="px-3 -me-2 py-1 bg-black border border-[#1b1b1b] rounded-full">
        x
      </button>
    </div>
  </div>
  )
}

export default Pill