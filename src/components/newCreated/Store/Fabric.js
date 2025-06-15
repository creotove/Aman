import React, { useEffect, useState } from "react";
import useToast from "../../../hooks/useToast";
import axios from "../../../apis/admin";
import Toast from "../Toast";
import Loader from "../Loader";

const Fabric = () => {
  const [name, setName] = useState("");
  const [purchasedPerMtrPrice, setPurchasedPerMtrPrice] = useState(0);
  const [sellingPerMtrPrice, setSellingPerMtrPrice] = useState(0);
  const [wholeSalerNames, setWholeSalerNames] = useState([]);
  const [purchasedFrom, setPurchasedFrom] = useState("");
  const [description, setDescription] = useState("");
  const [patternName, setPatternName] = useState("");
  const [stock, setStock] = useState(0);
  const [totalMtrsWhenBought, setTotalMtrsWhenBought] = useState(0);
  const [image, setImage] = useState("");
  const [fabrics, setFabrics] = useState([]);
  const [loading, setLoading] = useState(true);

  const [clicked, setClicked] = useState(false);
  const {
    showToast,
    setShowToast,
    setToastMsg,
    setToastType,
    toastMsg,
    toastType,
  } = useToast();

  const getWholeSalerIdName = async () => {
    try {
      const res = await axios.get("/purchases/wholeSalerIdName");
      if (res.data.success) {
        setWholeSalerNames(res.data.data);
      }
    } catch (error) {
      console.log(error);
      setToastMsg("Error fetching whole saler names");
      setToastType("error");
      setShowToast(true);
    }
  };

  const getFabrics = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/store/fabrics");
      if (res.data.success) {
        setFabrics(res.data.data);
      }
    } catch (error) {
      console.log(error);
      setToastMsg("Error fetching fabrics");
      setToastType("error");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };
  const handleAddFabric = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (name === "") {
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
      } else if (wholeSalerNames === "") {
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
        image,
      };
      const res = await axios.post("/addFabricItem", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        setToastMsg("Fabric added successfully");
        setToastType("success");
        setShowToast(true);
        getFabrics();
        setName("");
        setPurchasedPerMtrPrice(0);
        setSellingPerMtrPrice(0);
        setPurchasedFrom("");
        setDescription("");
        setPatternName("");
        setStock(0);
        setTotalMtrsWhenBought(0);
        setImage("");
      }
    } catch (error) {
      console.log(error);
      setToastMsg("Something went wrong");
      setToastType("error");
      setShowToast(true);
    }
  };

  useEffect(() => {
    getWholeSalerIdName();
    getFabrics();
  }, []);
  useEffect(() => {
    if (wholeSalerNames.length > 0) {
      setPurchasedFrom(wholeSalerNames[0]._id);
    }
  }, [wholeSalerNames]);
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
        className={`border border-[#1b1b1b] smallContainer radius  overflow-auto no-scrollbar  ${clicked ? "col-span-4 cursor-pointer" : "col-span-7"
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
          <tbody>
            {fabrics && fabrics.length > 0 ? (
              fabrics.map((fabric, idx) => (
                <tr key={fabric._id} className="hover:bg-[#1b1b1b]">
                  <td className="py-3 px-3 text-center">{idx + 1}</td>
                  <td className="py-3 px-3 text-center">{fabric.name}</td>
                  {clicked ? null : (
                    <td className="py-3 px-3 flex justify-center ">
                      <img
                        src={fabric.image}
                        alt={fabric.name}
                        className="w-8 h-8 object-cover rounded-full"
                      />
                    </td>
                  )}
                  {clicked ? null : (
                    <td className="py-3 px-3 text-center">
                      {fabric.wholeSalerName}
                    </td>
                  )}
                  <td className="py-3 px-3 text-center">
                    {fabric.sellingPerMtrPrice}
                  </td>
                  {clicked ? null : (
                    <td className="py-3 px-3 text-center">
                      {fabric.totalMtrsRemaining}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={clicked ? 4 : 6} className="py-3 px-3 text-center">
                  No fabrics found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        onClick={() => setClicked(true)}
        className={`border border-[#1b1b1b] h-[80vh] smallContainer radius overflow-auto no-scrollbar ${clicked ? "col-span-8 " : "col-span-5 cursor-pointer"
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
                onFocus={(e) => e.target.select()}
                onChange={(e) => setName(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Fabric's name"
              />
            </div>
            {/* Purchased per mtr price */}
            <div className="my-1 flex flex-col ">
              <label className="ms-1 w-full">Purchased per mtr price</label>
              <input
                onFocus={(e) => e.target.select()}
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
                onFocus={(e) => e.target.select()}
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
              <select
                className="inputBox w-48 md:w-60 me-auto md:me-0"
                onChange={(e) => {
                  setPurchasedFrom(e.target.value);
                  console.log(e.target.value);
                }}
                value={purchasedFrom}
              >
                {wholeSalerNames && wholeSalerNames.length > 0 ? (
                  wholeSalerNames.map((wholeSaler) => (
                    <option key={wholeSaler._id} value={wholeSaler._id}>
                      {wholeSaler.name}
                    </option>
                  ))
                ) : (
                  <option value="0">No whole saler found</option>
                )}
              </select>
            </div>
            {/* Description */}
            <div className="my-1 flex flex-col ">
              <label className="ms-1 w-full">Description</label>
              <input
                onFocus={(e) => e.target.select()}
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
                onFocus={(e) => e.target.select()}
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
                onFocus={(e) => e.target.select()}
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
                onFocus={(e) => e.target.select()}
                type="number"
                value={totalMtrsWhenBought}
                onChange={(e) => setTotalMtrsWhenBought(e.target.value)}
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
                placeholder="Total mtrs when bought"
              />
            </div>
          </div>
          {/* Image */}
          <div className="my-1 flex flex-col ">
            <label className="ms-1 w-full">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="inputBox w-48 md:w-60 me-auto md:me-0 "
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddFabric}
              disabled={loading}
              className="myBtn-success"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Fabric;
