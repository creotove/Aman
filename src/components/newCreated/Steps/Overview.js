import React, { useEffect, useRef, useState } from "react";
import useStitchBill from "../../../hooks/useStitchBill";
import QRCode from "react-qr-code";
import qrcode from "qrcode";

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
  const printMeasurementsSeparately = async (measurements, qrCodeImages) => {
    // Preload images before printing
    
    try {
      const preloadImages = Object.values(qrCodeImages).map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });
      // Wait for all images to be preloaded
      await Promise.all(preloadImages);

      for (const [key, value] of Object.entries(measurements)) {
        const printWindow = window.open(key, "print");
        const printDocument = printWindow.document;
        printDocument.write("<html><head><title>Print</title>");
        printDocument.write('<style type="text/css">');
        printDocument.write(
          `@media print { @page { size: 2.5in 3in; margin: 0; } }`
        ); // Set page size and remove margins
        printDocument.write(
          ".no-print, .no-print * { display: none !important; }"
        ); // Hide elements with class "no-print"
        printDocument.write(".container { width: 2.5in; height: 3in; }"); // Set container size
        printDocument.write(".radius { border-radius: 0.25rem; }"); // Add your component's CSS styles here
        printDocument.write(".bg-white { background-color: #fff; }");
        printDocument.write(
          ".qrImg { max-width: 80%; max-height: 80%; object-fit: contain; margin-block:-1.2rem; }"
        ); // Adjust image size to fit container
        printDocument.write(".text-black { color: #000; margin-block: -0.25rem;}");
        printDocument.write("</style></head><body>");

        printDocument.write(`<div class="container radius bg-white">`);
        printDocument.write(`<p >${key}</p>`);
        printDocument.write(
          `<img  class="qrImg" src="${qrCodeImages[key]}" alt="QR Code" />`
        );
        printDocument.write(`<div style="margin-top:1rem">`);
        printDocument.write(`<p class="text-black">Name: ${value.name}</p> <p class="text-black">Phone Number: ${value.phoneNumber}</p>`);

        printDocument.write(`</div>`);
        printDocument.write(`</div>`);

        printDocument.write("</body></html>");

        printDocument.close();
        printWindow.print();
        setTimeout(() => printWindow.close(), 500);
      }
    } catch (error) {
      console.error("Error loading QR code images:", error);
    }
  };

  const [qrCodeImages, setQrCodeImages] = useState({});

  useEffect(() => {
    const generateQRCodes = async () => {
      const qrCodes = {};
      for (const [key, value] of Object.entries(measurements)) {
        // Generate QR code data URL for each set of measurements
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
      // Generate QR code as a data URL
      const qrCodeDataURL = await qrcode.toDataURL(data, {
        errorCorrectionLevel: "H",
      });
      return qrCodeDataURL;
    } catch (error) {
      console.error("Error generating QR code:", error);
      return null;
    }
  };
  return (
    <section className="grid md:grid-cols-12 gap-4">
      {/* Left Part */}
      <div className="flex flex-col gap-4 md:col-span-6">
        <div className=" bg-[#0b0b0b] border border-[#1b1b1b] smallContainer  radius">
          <h2>Personal Details</h2>
          <div className="grid md:grid-cols-2">
            {/* Name */}
            <div className="mt-3 flex flex-col mb-2 md:col-span-1">
              <label className="ms-1 w-full">Name</label>
              <input
                type="text"
                value={name}
                readOnly
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
              />
            </div>
            {/* Phone number */}
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
            {/* Total amt. */}
            <div className="mt-3 flex flex-col mb-2 md:col-span-1">
              <label className="ms-1 w-full">Total amt.</label>
              <input
                type="number"
                value={totalAmt}
                readOnly
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
              />
            </div>
            {/* Advance amt. */}
            <div className="mt-3 flex flex-col mb-2 md:col-span-1">
              <label className="ms-1 w-full">Advance amt.</label>
              <input
                type="number"
                value={advanceAmt}
                readOnly
                className="inputBox w-48 md:w-60 me-auto md:me-0 "
              />
            </div>{" "}
            {/* Final amt. */}
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
      </div>
      <div className="md:col-span-6 flex flex-wrap">
        {Object.entries(measurements).map(([key, value]) => (
          <div
            key={key}
            className="radius bg-white m-1 h-min p-3 border border-black"
          >
            <h2 className="text-black">{key}</h2>
            <QRCode value={convertMeasurementsToString(value)} />
            <div className="flex justify-between mt-3">
              <p className="text-black">{value.name}</p>
              <p className="text-black">{value.phoneNumber}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="myBtn"
        onClick={() => printMeasurementsSeparately(measurements, qrCodeImages)}
      >
        Print
      </button>

      {/* Right Part */}
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
      {/* Qr Part */}
    </section>
  );
};

export default Overview;
