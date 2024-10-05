import React, { useState, useRef, useEffect } from "react";

export default function FileUploader({ onFileSelectSuccess, onFileSelectError, resetTriggered }) {
  const supportedFiles = ["application/pdf", "image/png", "image/jpeg"];
  const supportedFileEnds = supportedFiles.map((file) => file.split("/")[1]).join(", ");

  const [fileName, setFileName] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (resetTriggered) {
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [resetTriggered]);

  const handleFile = (file) => {
    if (supportedFiles.includes(file.type)) {
      setFileName(file.name);
      onFileSelectSuccess(file);
    } else {
      onFileSelectError({ error: "File must be a PDF/Image" });
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="file-uploader">
      <p className="text-base mb-4">{fileName || `Supports: ${supportedFileEnds}`}</p>

      <div
        className={`
          border-2 border-dashed border-green-500 rounded-md p-4 cursor-pointer
          transition duration-300 ease-in-out font-bold text-green-500 hover:animate-pulse
          ${isDragActive ? "bg-green-100" : "hover:bg-green-400 hover:border-green-800 hover:text-green-800"}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}>
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileInput} accept={supportedFiles.join(",")} />
        {isDragActive ? <p className="text-center">Drop the file here ...</p> : <p className="text-center ">Drag 'n' drop a file here, or click to select a file</p>}
      </div>
    </div>
  );
}