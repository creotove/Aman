export default function Accordion({
  isOpen,
  toggleAccordion,
  name,
  measurements,
  stitchingAmtCustomer,
  stitchingAmtTailor,
  cuttingAmt,
  handleEdit,
  handleDelete,
  index,
}) {
  return (
    <div className=" mb-1 text-white">
      <button
        className={`w-full slot p-4 text-left 
                             ${isOpen ? "rounded-t-3xl" : "rounded-3xl"}
                            transition duration-300`}
        onClick={toggleAccordion}
      >
        {name}
        <span
          className={`float-right transform ${
            isOpen ? "-rotate-90" : "rotate-90"
          }  
                                 transition-transform duration-300`}
        >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 2L17 12L7 22" stroke="#D9D9D9" stroke-width="2" />
            </svg>
        </span>
      </button>
      {isOpen && (
        <>
          <div className="p-3 slot flex">
            <h6 className="">Customer</h6>
            <p className="ms-auto">{stitchingAmtCustomer}</p>
          </div>
          <div className="p-3 slot flex">
            <h6 className="">Tailor</h6>
            <p className="ms-auto">{stitchingAmtTailor}</p>
          </div>
          <div className="p-3 slot flex">
            <h6 className="">Cutting Master</h6>
            <p className="ms-auto">{cuttingAmt}</p>
          </div>
        </>
      )}
      {isOpen && (
        <>
          <div className="listw">
            {measurements &&
              measurements.map((item, i) => (
                <div key={i} className="p-8 flex">
                  {item}
                </div>
              ))}
            <div className="flex h-full justify-end">
              <div className=" flex justify-end gap-2">
                <div
                  className="cursor-pointer myBtn radius"
                  onClick={() => handleEdit(index)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 6.50006L17.5 10.5001M4 20.0001H8L18.5 9.50006C18.7626 9.23741 18.971 8.92561 19.1131 8.58245C19.2553 8.23929 19.3284 7.87149 19.3284 7.50006C19.3284 7.12862 19.2553 6.76083 19.1131 6.41767C18.971 6.07451 18.7626 5.7627 18.5 5.50006C18.2374 5.23741 17.9256 5.02907 17.5824 4.88693C17.2392 4.74479 16.8714 4.67163 16.5 4.67163C16.1286 4.67163 15.7608 4.74479 15.4176 4.88693C15.0744 5.02907 14.7626 5.23741 14.5 5.50006L4 16.0001V20.0001Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className="cursor-pointer  radius myBtn"
                  onClick={() => handleDelete(index)}
                >
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                        fill="#FC3447"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
