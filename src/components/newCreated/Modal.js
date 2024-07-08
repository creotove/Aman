import React from "react";

const Modal = ({ modalState, setModalState, title, children }) => {
  return (
    <div
      className={`${modalState
        ? "fixed inset-0 z-50 flex items-center  justify-center bg-neutral-950 bg-opacity-80"
        : "hidden"
        } `}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setModalState(false);
      }}
    >
      <div
        className="bg-black border border-neutral-800 smallContainer radius h-3/4 md:h-min md:min-w-[40rem] overflow-y-auto no-scrollbar max-w-lg w-full"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between">
          <h3 className="headerText">{title}</h3>
          <button
            onClick={() => {
              setModalState(false);
            }}
            className="hover:bg-neutral-300 m-0 p-0 text-black text-3xl w-10 h-10 flex justify-center items-center bg-white rounded-full"
          >
            &times;
          </button>
        </div>
        <div className="smallContainer">{children}</div>
        <div className="flex justify-end items-end">
          <button
            className="myBtn text-white flex justify-center items-center"
            onClick={() => {
              setModalState(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
