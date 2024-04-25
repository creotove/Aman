import React, { useState } from "react";
import useToast from "../../../hooks/useToast";
import axios from "../../../apis/admin";
import Toast from "../Toast";

const Fabric = () => {
  const [name, setName] = useState("");
  const [purchasedPerMtrPrice, setPurchasedPerMtrPrice] = useState("");
  const [sellingPerMtrPrice, setSellingPerMtrPrice] = useState("");
  const [purchasedFrom, setPurchasedFrom] = useState("");
  const [description, setDescription] = useState("");
  const [patternName, setPatternName] = useState("");
  const [stock, setStock] = useState("");
  const [totalMtrsWhenBought, setTotalMtrsWhenBought] = useState("");

  const [clicked, setClicked] = useState(false);
  const {
    showToast,
    setShowToast,
    setToastMsg,
    setToastType,
    toastMsg,
    toastType,
  } = useToast();

  const handleAddFabric = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if(name === "") {
        setToastMsg("Name is required");
        setToastType("error");
        setShowToast(true);
        return;
      } else if (purchasedPerMtrPrice === "") {
        setToastMsg("Purchased per mtr price is required");
        setToastType("error");
        setShowToast(true);
        return;
      } else if (sellingPerMtrPrice === "") {
        setToastMsg("Selling per mtr price is required");
        setToastType("error");
        setShowToast(true);
        return;
      } else if (purchasedFrom === "") {
        setToastMsg("Purchased From is required");
        setToastType("error");
        setShowToast(true);
        return;
      } else if (description === "") {
        setToastMsg("Description is required");
        setToastType("error");
        setShowToast(true);
        return;
      } else if (patternName === "") {
        setToastMsg("Pattern Name is required");
        setToastType("error");
        setShowToast(true);
        return;
      } else if (stock === "") {
        setToastMsg("Stock is required");
        setToastType("error");
        setShowToast(true);
        return;
      } else if (totalMtrsWhenBought === "") {
        setToastMsg("Total mtrs when bought is required");
        setToastType("error");
        setShowToast(true);
        return;
      } 
      const data = {
        name,
        purchasedPerMtrPrice,
        sellingPerMtrPrice,
        purchasedFrom,
        description,
        patternName,
        stock,
        totalMtrsWhenBought,
      };

      const res = await axios.post("/addFabricItem", data);
      if (res.data.success) {
        setToastMsg("Fabric added successfully");
        setToastType("success");
        setShowToast(true);
      }

    } catch (error) {
      console.log(error);
      setToastMsg("Something went wrong");
      setToastType("error");
      setShowToast(true);
    }
  };
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
      <div
        onClick={() => setClicked(false)}
        className={`bg-[#0b0b0b] border border-[#1b1b1b] smallContainer radius  overflow-auto no-scrollbar  ${
          clicked ? "col-span-4 cursor-pointer" : "col-span-7"
        }`}
      >
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs inputBox subText uppercase">
            <tr className="">
              <th scope="col" className="py-3 px-3 text-center">
                #
              </th>
              <th scope="col" className="py-3 px-3 text-center">
                Name
              </th>
              {clicked ? null : (
                <th scope="col" className="py-3 px-3 text-center">
                  Image
                </th>
              )}
              {clicked ? null : (
                <th scope="col" className="py-3 px-3 text-center">
                  Purchased from
                </th>
              )}
              <th scope="col" className="py-3 px-3 text-center">
                Selling price
              </th>
              {clicked ? null : (
                <th scope="col" className="py-3 px-3 text-center">
                  Mtrs. in stock
                </th>
              )}
            </tr>
          </thead>
        </table>
      </div>
      <div
        onClick={() => setClicked(true)}
        className={`bg-[#0b0b0b] border border-[#1b1b1b] h-[80vh] smallContainer radius overflow-auto no-scrollbar ${
          clicked ? "col-span-8 " : "col-span-5 cursor-pointer"
        }`}
      >
        <form>
          <div className="flex flex-wrap gap-4">
            {/* Name */}
            <div className="my-1 flex flex-col">
              <label className="ms-1 w-full">Fabric name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Fabric's name"
              />
            </div>
            {/* Purchased per mtr price */}
            <div className="my-1 flex flex-col ">
              <label className="ms-1 w-full">Purchased per mtr price</label>
              <input
                type="number"
                value={purchasedPerMtrPrice}
                onChange={(e) => setPurchasedPerMtrPrice(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Purchased per mtr price"
              />
            </div>
            {/* Selling per mtr price */}
            <div className="my-1 flex flex-col ">
              <label className="ms-1 w-full">Selling per mtr price</label>
              <input
                type="number"
                value={sellingPerMtrPrice}
                onChange={(e) => setSellingPerMtrPrice(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Selling per mtr price"
              />
            </div>
            {/* Purchased From */}
            <div className="my-1 flex flex-col ">
              <label className="ms-1 w-full">Purchased from</label>
              <input
                type="text"
                value={purchasedFrom}
                onChange={(e) => setPurchasedFrom(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Purchased from"
              />
            </div>
            {/* Description */}
            <div className="my-1 flex flex-col ">
              <label className="ms-1 w-full">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Description"
              />
            </div>
            {/* Pattern Name */}
            <div className="my-1 flex flex-col ">
              <label className="ms-1 w-full">Pattern name</label>
              <input
                type="text"
                value={patternName}
                onChange={(e) => setPatternName(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Pattern name"
              />
            </div>
            {/* Stock */}
            <div className="my-1 flex flex-col ">
              <label className="ms-1 w-full">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Stock"
              />
            </div>
            {/* Total mtrs when bought */}
            <div className="my-1 flex flex-col ">
              <label className="ms-1 w-full">Total mtrs when bought</label>
              <input
                type="number"
                value={totalMtrsWhenBought}
                onChange={(e) => setTotalMtrsWhenBought(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Total mtrs when bought"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button  onClick={handleAddFabric} className="myBtn">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Fabric;
