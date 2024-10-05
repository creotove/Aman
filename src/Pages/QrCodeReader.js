import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from "html5-qrcode";
import ImageUploader from "../components/newCreated/FileUploader";
import { scanFile } from "@openhealthnz-credentials/pdf-image-qr-scanner";

const QrCodeReader = () => {
  const [scanResult, setScanResult] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [error, setError] = useState(null);
  const [resetTriggered, setResetTriggered] = useState(false);
  const html5QrcodeScannerRef = useRef(null);

  const qrCodeSuccessCallback = (decodedText) => {
    setScanResult(JSON.parse(decodedText));
    setShowScanner(false);
    setError(null);
  };

  const qrCodeErrorCallback = (errorMessage) => {
    console.error(errorMessage);
  };

  useEffect(() => {
    if (showScanner) {
      const config = { fps: 10, qrbox: 250 };
      const scanner = new Html5QrcodeScanner("reader", {
        config,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
      }, true);
      html5QrcodeScannerRef.current = scanner;
      scanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);
    }

    return () => {
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear();
      }
    };
  }, [showScanner]);

  const handleReset = () => {
    setScanResult(null);
    setShowScanner(false);
    setError(null);
    setResetTriggered(prev => !prev);  // Toggle this to trigger useEffect in FileUploader
  };

  const renderTableRows = () => {
    if (!scanResult) return null;
    
    const { name, phoneNumber, ...measurements } = scanResult;
    return (
      <>
        <tr>
          <td className="border border-gray-400 px-4 py-2">Name</td>
          <td className="border border-gray-400 px-4 py-2">{name}</td>
        </tr>
        <tr>
          <td className="border border-gray-400 px-4 py-2">Phone Number</td>
          <td className="border border-gray-400 px-4 py-2">{phoneNumber}</td>
        </tr>
        {Object.entries(measurements).map(([key, value]) => (
          <tr key={key}>
            <td className="border border-gray-400 px-4 py-2">{key}</td>
            <td className="border border-gray-400 px-4 py-2">{value}</td>
          </tr>
        ))}
      </>
    );
  };

  async function processFile(selectedFile) {
    try {
      const qrCode = await scanFile(selectedFile);
      if (qrCode) {
        setScanResult(JSON.parse(qrCode));
        setError(null);
      } else {
        setScanResult(null);
        setError("No QR code found in the uploaded file.");
      }
    } catch (e) {
      console.error(e);
      setScanResult(null);
      setError(e.name === "InvalidPDFException" ? "Invalid PDF file." : "An error occurred while processing the file.");
    }
  }

  return (
    <section className="text-white">
      <h2 className="text-2xl font-bold mb-4">QR Code Reader</h2>
      {!showScanner && (
        <>
          <ImageUploader
            onFileSelectError={(err) => {
              console.error(err.error);
              setError(err.error);
            }}
            onFileSelectSuccess={processFile}
            resetTriggered={resetTriggered}
          />
          <button 
            onClick={() => setShowScanner(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Scan QR Code
          </button>
        </>
      )}
      {showScanner && (
        <>
          <div id="reader"></div>
          <button 
            onClick={() => setShowScanner(false)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Cancel Scan
          </button>
        </>
      )}
      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}
      {scanResult && (
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Field</th>
              <th className="border border-gray-400 px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      )}
      {(scanResult || error) && (
        <button 
          onClick={handleReset}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Reset
        </button>
      )}
    </section>
  );
};

export default QrCodeReader;