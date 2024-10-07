import React, { useEffect, useState } from "react";
import useToast from "../../../hooks/useToast";
import axios from "../../../apis/admin";
import Toast from "../Toast";
import { useNavigate } from "react-router-dom";

const WholeSale = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [wholeSalers, setWholeSalers] = useState([]);
  const navigate = useNavigate()

  const {
    showToast,
    setShowToast,
    setToastMsg,
    setToastType,
    toastMsg,
    toastType,
  } = useToast();

  const handleAddWholeSaler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (name === "") {
        setToastMsg("Name is required");
        setToastType("error");
        setShowToast(true);
        return;
      } else if (email === "") {
        setToastMsg("Purchased Per Mtr Price is required");
        setToastType("error");
        setShowToast(true);
        return;
      } else if (phone === "") {
        setToastMsg("Selling Per Mtr Price is required");
        setToastType("error");
        setShowToast(true);
        return;
      } else if (address === "") {
        setToastMsg("Purchased From is required");
        setToastType("error");
        setShowToast(true);
        return;
      }
      const data = {
        name,
        email,
        phone,
        address,
      };

      const res = await axios.post("/purchases/wholeSaler", data);
      if (res.data.success) {
        setToastMsg("Saved");
        setToastType("success");
        setShowToast(true);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        getWholeSalers();
      }
    } catch (error) {
      console.log(error);
      setToastMsg("Something went wrong");
      setToastType("error");
      setShowToast(true);
    }
  };

  const getWholeSalers = async () => {
    try {
      const res = await axios.get("/purchases/wholeSalers");
      if (res.data.success) {
        setWholeSalers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWholeSalers();
  }, []);

  return (
    <section className="grid md:grid-cols-12 gap-4">
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
      <div className="bg-[#0b0b0b] border border-[#1b1b1b] smallContainer radius overflow-auto no-scrollbar md:col-span-7 text-white">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs inputBox subText uppercase">
            <tr className="">
              <th scope="col" className="px-3 py-3 text-center">
                #
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Phone
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Address
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {wholeSalers && wholeSalers.length > 0 ? (
              wholeSalers.map((wholeSaler, index) => (
                <tr key={index} className="border-b border-[#1b1b1b]">
                  <td className="px-3 py-3 text-center">{index + 1}</td>
                  <td className="px-3 py-3 text-center">{wholeSaler.name}</td>
                  <td className="px-3 py-3 text-center">{wholeSaler.email}</td>
                  <td className="px-3 py-3 text-center">{wholeSaler.phone}</td>
                  <td className="px-3 py-3 text-center">
                    {wholeSaler.address.split(" ").map((word, index) => {
                      if (index > 3) return "...";
                      return word + " ";
                    })}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button
                      className="text-xs font-semibold px-2 py-1 radius me-2 bg-green-300 text-green-800
                  "
                      onClick={() => {
                        navigate(`addWholeSalerBill/${wholeSaler._id}`);
                      }}
                    >
                      Add Bill
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-[#0b0b0b] border border-[#1b1b1b] h-[80vh] smallContainer radius overflow-auto no-scrollbar md:col-span-5">
        <form>
          <div className="flex flex-wrap gap-4">
            {/* Name */}
            <div className="my-1 flex flex-col">
              <label className="ms-1 w-full">Whole Saler name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Whole Saler's name"
              />
            </div>
            {/* Email */}
            <div className="my-1 flex flex-col">
              <label className="ms-1 w-full">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Email"
              />
            </div>
            {/* Phone */}
            <div className="my-1 flex flex-col">
              <label className="ms-1 w-full">Phone number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Phone number"
              />
            </div>
            {/* Address */}
            <div className="my-1 flex flex-col">
              <label className="ms-1 w-full">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Address"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={handleAddWholeSaler} className="myBtn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default WholeSale;
