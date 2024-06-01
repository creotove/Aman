import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import * as pdfjs from "pdfjs-dist/build/pdf";

const QrCodeReader = () => {
  const [scanResult, setScanResult] = useState({
    Length: "0",
    Waist: "0",
    Hip: "0",
    Thigh: "0",
    Knee: "0",
    Ankle: "0",
    name: "Altamas",
    phoneNumber: "9265704645"
  });

  const html5QrcodeScannerRef = useRef(null);

  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    console.log(decodedText);
    setScanResult(JSON.parse(decodedText));
    if (html5QrcodeScannerRef.current) {
      html5QrcodeScannerRef.current.clear(); // Clear the scanner
    }
  };

  const qrCodeErrorCallback = (errorMessage) => {
    console.log(errorMessage);
  };

  useEffect(() => {
    const config = { fps: 10, qrbox: 250 };
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", config, true);
    html5QrcodeScannerRef.current = html5QrcodeScanner; // Save reference to ref
    html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

    return () => {
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear();
      }
    };
  }, [qrCodeSuccessCallback, qrCodeErrorCallback]);

  const handleScanAgain = () => {
    if (html5QrcodeScannerRef.current) {
      html5QrcodeScannerRef.current.clear(); // Clear the scanner
      html5QrcodeScannerRef.current.render(
        qrCodeSuccessCallback,
        qrCodeErrorCallback
      ); // Render the scanner again
    }
    setScanResult({
      Length: "0",
      Waist: "0",
      Hip: "0",
      Thigh: "0",
      Knee: "0",
      Ankle: "0",
      name: "Altamas",
      phoneNumber: "9265704645"
    }); // Reset scan result
  };

  const renderTableRows = () => {
    return Object.entries(scanResult).map(([key, value]) => (
      <tr key={key}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    ));
  };

  return (
    <section>
      <h2>QR Code Reader</h2>
      <div id="reader"></div>
      <button onClick={handleScanAgain}>Scan Again</button>
      {scanResult === "No result" ? (
        <p>Scan a QR code or upload a PDF file</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      )}
    </section>
  );
};

export default QrCodeReader;
