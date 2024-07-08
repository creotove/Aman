export default function MeasurementAccordian({
    isOpen,
    toggleAccordion,
    name,
    measurements,
}) {
    return (
        <div className=" mb-1 text-white col-span-6 ">
            <button
                className={`w-full slot p-4 text-left 
                             ${isOpen ? "rounded-t-3xl" : "rounded-3xl"}
                            transition duration-300`}
                onClick={toggleAccordion}
            >
                {name}
                <span
                    className={`float-right transform ${isOpen ? "-rotate-90" : "rotate-90"
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
                        <path d="M7 2L17 12L7 22" stroke="#D9D9D9" strokeWidth="2" />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <div className="listw">
                    {measurements &&
                        Object.entries(measurements).map(([measurementName, value], index) => (
                            <div key={index} className="p-8 flex">
                                <h6 className="">{measurementName}</h6>
                                <p className="ms-auto">{value}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
