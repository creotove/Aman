import { useEffect } from "react";
import axios from "../../../apis/admin";
import useStitchBill from "../../../hooks/useStitchBill";

const Bill = () => {
  const {
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    takeMeasurementsOf,
    advanceAmt,
    setAdvanceAmt,
    totalAmt,
    setTotalAmt,
    finalAmt,
    setFinalAmt,
    clothingItemsQty,
    setClothingItemsQty,
    stitchItems,
    setStitchItems,
    
    setBillItems,
  } = useStitchBill();

  const getStitchingAmountsForCustomer = async () => {
    try {
      const res = await axios.get("/clothingItems");
      if (res.data.success) {
        const clothingItems = res.data.data;
        const items = clothingItems.filter((item) =>
          takeMeasurementsOf.includes(item.name)
        );
        setStitchItems(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStitchingAmountsForCustomer();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // Calculate total when stitchItems or clothingItemsQty change
    const total = stitchItems.reduce((acc, stitchAmt, index) => {
      const qty = clothingItemsQty[index]
        ? parseInt(clothingItemsQty[index])
        : 0;
      return acc + stitchAmt.stitchingAmtCustomer * qty;
    }, 0);
    setTotalAmt(total);
    // eslint-disable-next-line
  }, [stitchItems, clothingItemsQty]);

  useEffect(() => {
    // Calculate final amount when advance amount or subtotal changes
    const final = totalAmt - advanceAmt;
    setFinalAmt(final);
    // eslint-disable-next-line
  }, [advanceAmt, totalAmt]);


  useEffect(() => {
    // Update bill items array whenever clothingItemsQty changes
    const updatedItems = stitchItems.map((stitchAmt, index) => ({
      clothName: stitchAmt.name,
      stitchingAmt: stitchAmt.stitchingAmtCustomer,
      quantity: clothingItemsQty[index] ? parseInt(clothingItemsQty[index]) : 0,
      totalStitchingAmt: stitchAmt.stitchingAmtCustomer * clothingItemsQty[index],
    }));
    setBillItems(updatedItems);
    //eslint-disable-next-line
  }, [stitchItems, clothingItemsQty]);
  return (
    <div className="bg-[#0b0b0b] border border-[#1b1b1b] smallContainer radius">
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-wrap gap-4">
          {/* Name */}
          <div className="mt-3 flex flex-col mb-2">
            <label className="ms-1 w-full">Customer name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="inputBox w-48 md:w-60 me-auto md:me-0 "
              placeholder="Customer's name"
            />
          </div>
          {/* Phone Number */}
          <div className="mt-3 flex flex-col mb-2">
            <label className="ms-1 w-full">Phone number</label>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="inputBox w-48 md:w-60 me-auto md:me-0 "
              placeholder="Customer's phone number"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {stitchItems &&
            stitchItems.map((stitchAmt, index) => (
              <div key={index} className="mt-3 flex flex-col mb-2">
                <label className="ms-1 w-full">{stitchAmt.name + " Qty"}</label>
                <input
                  type="number"
                  value={clothingItemsQty[index] ? clothingItemsQty[index] : ""}
                  onChange={(e) => {
                    const newQty = [...clothingItemsQty];
                    newQty[index] = e.target.value;
                    setClothingItemsQty(newQty);
                  }}
                  className="inputBox w-48 md:w-60 me-auto md:me-0 "
                  placeholder={stitchAmt.name + " Qty"}
                />
              </div>
            ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {/* Advance */}
          <div className="mt-3 flex flex-col mb-2">
            <label className="ms-1 w-full">Advance Amt.</label>
            <input
              type="number"
              value={advanceAmt}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setAdvanceAmt(parseInt(e.target.value))}
              className="inputBox w-48 md:w-60 me-auto md:me-0 "
              placeholder="Advance Amt."
            />
          </div>
        </div>

        <div className="flex flex-wrap  gap-4">
          {/* Total */}
          <div className="mt-3 flex flex-col mb-2">
            <label className="ms-1 w-full">Sub total amt.</label>
            <input
              type="number"
              value={totalAmt}
              onChange={(e) => setTotalAmt(parseInt(e.target.value))}
              className="inputBox w-48 md:w-60 me-auto md:me-0 "
              placeholder="Sub total amt."
            />
          </div>
          {/* Final Amt */}
          <div className="mt-3 flex flex-col mb-2">
            <label className="ms-1 ">Final Amt.</label>
            <input
              type="number"
              value={finalAmt}
              onChange={(e) => setFinalAmt(parseInt(e.target.value))}
              className="inputBox w-48 md:w-60 me-auto md:me-0 "
              placeholder="Final Amt."
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Bill;
