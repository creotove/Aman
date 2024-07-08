import React, { useEffect, useRef, useState } from "react";
import useStitchBill from "../../../hooks/useStitchBill";
import QRCode from "react-qr-code";
import qrcode from "qrcode";
import handlePrint from "../HandlePrint";

const Overview = () => {
  const {
    name,
    phoneNumber,
    advanceAmt,
    totalAmt,
    finalAmt,
    billItems,
    measurements,
  } = useStitchBill();

  for (let item in measurements) {
    measurements[item].name = name;
    measurements[item].phoneNumber = phoneNumber;
  }

  const convertMeasurementsToString = (measurements) => {
    const { name, phoneNumber, ...rest } = measurements;
    return JSON.stringify(rest);
  };

  const [qrCodeImages, setQrCodeImages] = useState({});

  useEffect(() => {
    const generateQRCodes = async () => {
      const qrCodes = {};
      for (const [key, value] of Object.entries(measurements)) {
        const qrCodeDataURL = await generateQRCodeDataURL(
          JSON.stringify(value)
        );
        qrCodes[key] = qrCodeDataURL;
      }
      setQrCodeImages(qrCodes);
    };

    generateQRCodes();
  }, [measurements]);

  const generateQRCodeDataURL = async (data) => {
    try {
      const qrCodeDataURL = await qrcode.toDataURL(data, {
        errorCorrectionLevel: "H",
      });
      return qrCodeDataURL;
    } catch (error) {
      console.error("Error generating QR code:", error);
      return null;
    }
  };
  const componentRef = useRef();
  return (
    <section className="grid md:grid-cols-12 gap-4">
      <div className="flex flex-col gap-4 md:col-span-6">
        <div className=" bg-[#0b0b0b] border border-[#1b1b1b] smallContainer  radius">
          <h2>Personal Details</h2>
          <div className="grid md:grid-cols-2">
            <div className="mt-3 flex flex-col mb-2 md:col-span-1">
              <label className="ms-1 w-full">Name</label>
              <input
                type="text"
                value={name}
                readOnly
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
              />
            </div>
            <div className="mt-3 flex flex-col mb-2 md:col-span-1">
              <label className="ms-1 w-full">Phone number</label>
              <input
                type="text"
                value={phoneNumber}
                readOnly
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
              />
            </div>
          </div>
        </div>
        <div className=" bg-[#0b0b0b] border border-[#1b1b1b] smallContainer  radius">
          <h2>Bill Amts.</h2>
          <div className="grid md:grid-cols-2">
            <div className="mt-3 flex flex-col mb-2 md:col-span-1">
              <label className="ms-1 w-full">Total amt.</label>
              <input
                type="number"
                value={totalAmt}
                readOnly
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
              />
            </div>
            <div className="mt-3 flex flex-col mb-2 md:col-span-1">
              <label className="ms-1 w-full">Advance amt.</label>
              <input
                type="number"
                value={advanceAmt}
                readOnly
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
              />
            </div>
            <div className="mt-3 flex flex-col mb-2 md:col-span-1">
              <label className="ms-1 w-full">Final amt.</label>
              <input
                type="number"
                value={finalAmt}
                readOnly
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:col-span-6 h-full">
          <div className=" bg-[#0b0b0b] border border-[#1b1b1b] smallContainer radius h-full">
            <table className="w-full">
              <thead className="pb-4">
                <tr>
                  <th className="text-center pb-3">Item</th>
                  <th className="text-center pb-3">Price</th>
                  <th className="text-center pb-3">Qty</th>
                  <th className="text-center pb-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {billItems &&
                  billItems.map((item, index) => (
                    <tr key={index} className="border-t-2 border-[#1b1b1b]">
                      <td className="text-center py-1">{item?.clothName}</td>
                      <td className="text-center py-1">{item?.stitchingAmt}</td>
                      <td className="text-center py-1">{item?.quantity}</td>
                      <td className="text-center py-1">
                        {item?.totalStitchingAmt}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="md:col-span-6 flex flex-wrap" ref={componentRef}>
        {Object.entries(measurements).map(([key, value]) => (
          <div
            key={key}
            id={`print-${key}`}
            className="print-container radius bg-white m-1 h-min p-3 "
          >
            <h2 className="text-black text-xl mb-2">{key}</h2>
            <QRCode className="qr-code" value={convertMeasurementsToString(value)} />
            <div className="details">
              <p className="text-black">Name: {value.name}</p>
              <p className="text-black">Phone: {value.phoneNumber}</p>
            </div>
          </div>
        ))}
      </div>


    </section>
  );
};

export default Overview;
