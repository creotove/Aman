import axios from "../apis/admin";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import Toast from "../components/newCreated/Toast";

const AddWork = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeProfile = location.state?.employeeProfile;
  const employeeAmounts =
    employeeProfile?.employeeDetails?.cuttingAmounts || employeeProfile?.employeeDetails?.stitchingAmounts;

  const [selectedClothings, setSelectedClothings] = useState([]);
  const [quantities, setQuantities] = useState({});

  const {
    showToast,
    setShowToast,
    setToastMsg,
    setToastType,
    toastMsg,
    toastType,
  } = useToast();

  // Fetch clothings from the API (mocked here for illustration)
  const [clothings, setClothings] = useState([]);

  const getClothings = async () => {
    try {
      const res = await axios.get("/store/clothingItems");
      if (res.data.success) {
        setClothings(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching clothings", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const workObject = selectedClothings.reduce((obj, clothingName) => {
      obj[clothingName] = {
        quantity: quantities[clothingName] || 0,
        perPiece: employeeAmounts[clothingName] || 0,
        totalAmount:
          (quantities[clothingName] || 0) *
          (employeeAmounts[clothingName] || 0),
      };
      return obj;
    }, {});

    // Structure the data as needed by your backend
    const dataToSubmit = {
      employeeId: employeeProfile?.employeeId, // Assuming employeeId is available
      work: workObject,
      totalAmount: calculateTotal(),
    };

    try {
      const res = await axios.post(
        `/employees/work/${employeeProfile?._id}`,
        dataToSubmit
      );
      if (res.data.success) {
        setShowToast(true);
        setToastMsg(res.data.message);
        setToastType("success");
        navigate(`/employees/${employeeProfile?._id}`, {
          state: employeeProfile?.role.toUpperCase(),
        });
      } else {
        setShowToast(true);
        setToastMsg(res.data.message);
        setToastType("error");
      }
    } catch (error) {
      console.error("Error submitting work details", error);
    }
  };
  useEffect(() => {
    getClothings();
  }, []);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setSelectedClothings(
      checked
        ? [...selectedClothings, value]
        : selectedClothings.filter((item) => item !== value)
    );

    if (!checked) {
      const updatedQuantities = { ...quantities };
      delete updatedQuantities[value];
      setQuantities(updatedQuantities);
    }
  };

  const handleQuantityChange = (e, clothingName) => {
    const { value } = e.target;
    setQuantities({ ...quantities, [clothingName]: Number(value) });
  };

  const calculateTotal = () => {
    return selectedClothings.reduce((total, clothingName) => {
      const quantity = quantities[clothingName] || 0;
      const amount = employeeAmounts[clothingName] || 0;
      return total + amount * quantity;
    }, 0);
  };

  return (
    <section>
      {showToast && (
        <Toast
          message={toastMsg}
          type={toastType}
          onClose={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowToast(false);
          }} // Close the toast
        />
      )}
      {/* Profile info */}
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
            <div className="headerText">
              <h6 className=" subText">{employeeProfile?.phoneNumber}</h6>
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
      </div>
      {/* Form */}
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="bg-[#0b0b0b] border border-[#1b1b1b] smallContainer mt-5 radius">
          <div>
            <label>Clothing Items</label>
            {clothings.map((item) => (
              <div key={item.name}>
                <input
                  id={item.name}
                  name={item.name}
                  type="checkbox"
                  onChange={handleChange}
                  checked={selectedClothings.includes(item.name)}
                  value={item.name}
                />
                <label
                  htmlFor={item.name}
                >{item.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#0b0b0b] border border-[#1b1b1b] smallContainer mt-5 radius">
          <label>Quantities</label>
          {selectedClothings.map((clothingName) => (
            <div key={clothingName}>
              <label>{clothingName}: </label>
              <input
                type="number"
                placeholder="Qty"
                className="inputBox w-60 me-auto md:me-0"
                value={quantities[clothingName] || ""}
                onChange={(e) => handleQuantityChange(e, clothingName)}
              />
            </div>
          ))}
          <div className="mt-5 flex">
            Total Amount: <p className="ms-2 font-bold"> {calculateTotal()}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="myBtn mt-5">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddWork;
