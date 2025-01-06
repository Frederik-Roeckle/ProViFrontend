"use client";

import React, { useRef, useState } from "react";

const QuestionnaireUploadBox = ({ title }) => {
  const fileInputRef = useRef(null);
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.name.endsWith(".csv")) {
        alert("Please upload a valid .csv file.");
        return;
      }

      console.log(`${title} - File selected: ${file.name}`);

      const formData = new FormData();
      formData.append("file", file);

      // API Post Call
      try {
        const response = await fetch("https://pm-vis.uni-mannheim.de/api/admin/questionnaire", {
          method: "POST",
          body: formData,
          credentials: "include", // Include cookies in the request
        });

        if (!response.ok) {
          console.error(`Failed to upload the file. Status: ${response.status}`);
          alert(`Failed to upload the file: ${response.statusText}`);
          return;
        }

        const result = await response.json();
        console.log("Questionnaire uploaded successfully:", result);

        // Update UI to reflect the newly uploaded questionnaire
        setCurrentQuestionnaire(file.name);
        setUploadMessage("Questionnaire uploaded successfully!");

        // Hide the upload message after 5 seconds
        setTimeout(() => {
          setUploadMessage("");
        }, 5000);

        fileInputRef.current.value = null;
      } catch (error) {
        console.error("Error during file upload:", error.message);
        alert("An error occurred while uploading the questionnaire. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md h-auto w-full flex flex-col gap-4 max-h-[500px]">
      <h3 className="text-lg font-semibold">{title}</h3>
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
          accept=".csv"
          onChange={handleFileChange}
        />
      </div>
      <div className="mt-4">
        <h4 className="text-md font-medium">Current Questionnaire</h4>
        <div className="flex items-center justify-between border p-2 rounded-md mt-2">
          <span>{currentQuestionnaire}</span>
        </div>
      </div>
      {uploadMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded-md mt-4">
          {uploadMessage}
        </div>
      )}
    </div>
  );
};

export default QuestionnaireUploadBox;
