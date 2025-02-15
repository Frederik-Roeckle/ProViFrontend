"use client";

/**
 * DatasetUploadBox Component
 *
 * This component provides an interface for uploading dataset files (.xes format) to the backend.
 * - Allows users to select and upload dataset files but only allows for .XES files
 */

import React, { useRef, useState } from "react";

const DatasetUploadBox = ({ title, refreshDatasetList  }) => {
  const fileInputRef = useRef(null);
  const [uploadMessage, setUploadMessage] = useState("");

  /**
   * Triggers the file input dialog when the upload button is clicked.
   */
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  /**
   * Handles file selection and upload process (backend API)
   */
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.name.endsWith(".xes")) {
        alert("Please upload a valid .xes file.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      // API Call POST ti upload dataset
      try {
        const response = await fetch(
          "https://pm-vis.uni-mannheim.de/api/admin/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          console.error(`Failed to upload the file. Status: ${response.status}`);
          alert(`Failed to upload the file: ${response.statusText}`);
          return;
        }

        const result = await response.json();

        // Sets success message and hides it after 5 seconds
        setUploadMessage("Dataset uploaded successfully!");

        // Refresh the dataset list to reflect the newly uploaded dataset
        if (refreshDatasetList) {
          refreshDatasetList();
        }

        setTimeout(() => {
          setUploadMessage("");
        }, 5000);
      } catch (error) {
        console.error("Error during file upload:", error.message);
        alert("An error occurred while uploading the dataset. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md h-auto w-full flex flex-col gap-4 max-h-[500px]">
      {/* Upload Box Title */}
      <h3 className="text-lg font-semibold">{title}</h3>
      {/* Upload Button & Dropzone UI */}
      <div className="flex items-center justify-center border-2 border-dashed border-gray-300 h-32 rounded-md">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={handleUploadClick}
        >
          New Upload
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".xes"
          onChange={handleFileChange}
        />
      </div>
      {uploadMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded-md mt-4">
          {uploadMessage}
        </div>
      )}
    </div>
  );
};

export default DatasetUploadBox;
