import { useState } from "react";
import ChooseBill from "./ChooseBill";

const SearchBar = ({
  placeHolderText,
  identifier,
  setIdentifier,
  handleSearch,
  buttonText,
}) => {
  const [modalState, setModalState] = useState(false);
  return (
    <div
      className="flex justify-between"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="flex flex-wrap justify-between w-full">
        <div className="flex justify-center items-center order-2 md:order-1 mt-5 md:mt-0">
          <input
            type="text"
            value={identifier}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(e);
            }}
            onChange={(e) => {
              setIdentifier(e.target.value);
            }}
            className="inputBox text-white md:w-96 me-2"
            placeholder={placeHolderText}
          />
          <button
            className="flex bg-neutral-900 p-2 rounded-full justify-center items-center cursor-pointer"
            onClick={handleSearch}
          >
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="8.32031"
                cy="8.60132"
                r="7"
                stroke="#D9D9D9"
                strokeWidth="2"
              />
              <rect
                x="13.5911"
                y="13.574"
                width="9.5166"
                height="1.54918"
                rx="0.774592"
                transform="rotate(45 13.5911 13.574)"
                fill="#D9D9D9"
              />
            </svg>
          </button>
        </div>
        <div className="order-1 text-end w-full md:w-max md:order-2">
          {buttonText && (
            <button
              onClick={() => {
                setModalState(true);
              }}
              className="myBtn radius"
            >
              {buttonText}
            </button>
          )}
          {buttonText === "Customer mgmt."
            ? modalState && (
              <ChooseBill
                modalState={modalState}
                setModalState={setModalState}
              />
            )
            : null}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
