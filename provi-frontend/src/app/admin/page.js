"use client";

/**
   * This is the admin page for managing the experiment (datasets + questionnaire) as well as 
   * the upload of datasets/ questionnaire and the download of collected user data
   */

import Head from "next/head";
import { useEffect, useState } from "react";

import LoginModal from "../../components/Admin/LoginModal";
import DatasetUploadBox from "../../components/Admin/DatasetUploadBox";
import QuestionnaireUploadBox from "../../components/Admin/QuestionnaireUploadBox";
import DownloadBox from "../../components/Admin/DownloadBox";
import Navigation from "../../components/General/Navigation";

export default function AdminPage() {
  const [datasets, setDatasets] = useState([]); // To store datasets from backend
  const [dataset1, setDataset1] = useState(""); // Selected dataset 1
  const [dataset2, setDataset2] = useState(""); // Selected dataset 2
  const [dataset1ID, setDataset1ID] = useState(""); // Selected datasetID 1
  const [dataset2ID, setDataset2ID] = useState(""); // Selected datasetID 2
  const [userCountDataset1, setuserCountDataset1] = useState(""); // Store user counts for dataset1
  const [userCountDataset2, setuserCountDataset2] = useState(""); // Store user counts for dataset2
  const [successMessage, setSuccessMessage] = useState(""); // Displays success message after dataset selection
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state


   /**
   * Fetches all available datasets from the backend and updates the state.
   * It sorts the datasets, putting active datasets at the top, and selects the first two active datasets.
   */
  const fetchDatasets = async () => {

    try {
      const response = await fetch("https://pm-vis.uni-mannheim.de/api/admin/datasets");
      if (!response.ok) throw new Error("Failed to fetch datasets");
      
      const data = await response.json();

      // Sort datasets to have active datasets at the top
      const sortedDatasets = [...data].sort((a, b) => {
        if (a.dataset_is_active && !b.dataset_is_active) return -1;
        if (!a.dataset_is_active && b.dataset_is_active) return 1;
        return 0;
      });

      // Select the two active datasets
      const activeDatasets = sortedDatasets.filter((dataset) => dataset.dataset_is_active);
      const dataset1ID = activeDatasets[0]?.dataset_id || "";
      const dataset2ID = activeDatasets[1]?.dataset_id || "";

      setDataset1(activeDatasets[0]?.dataset_title || "");
      setDataset2(activeDatasets[1]?.dataset_title || "");
      setDataset1ID(dataset1ID);
      setDataset2ID(dataset2ID);
      setDatasets(sortedDatasets);

      // Fetch user counts after datasets are fetched to display at the top
      await fetchUserCounts(dataset1ID, dataset2ID);
    } catch (error) {
      console.error("Error fetching datasets:", error);
    }
  };


    /**
   * Fetches user counts for each dataset from the backend.
   * Maps dataset IDs to the corresponding user count and updates the state.
   */
   const fetchUserCounts = async (dataset1ID, dataset2ID) => {
    try {
      const response = await fetch("https://pm-vis.uni-mannheim.de/api/admin/usagedataset");
      if (!response.ok) throw new Error("Failed to fetch usage dataset info");
  
      const data = await response.json();
  
      // Map dataset IDs to user counts
      const counts = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value; 
        return acc;
      }, {});
  
      // update or set user counts for selected datasets
      setuserCountDataset1(counts[dataset1ID] || 0); // Default to 0 if no match found
      setuserCountDataset2(counts[dataset2ID] || 0); // Default to 0 if no match found
      
  
    } catch (error) {
      console.error("Error fetching usage dataset info:", error);
    }
  };
  
  /**
   * Runs `fetchDatasets()` after a successful login.
   * Ensures data is only fetched when the user is authenticated.
   */
  useEffect(() => {
    if (isLoggedIn) {
      fetchDatasets();
    }
  }, [isLoggedIn]);

  
  /**
   * Handles login success and sets the authentication state.
   */
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // If the user is not logged in, show the login modal
  if (!isLoggedIn) {
    return <LoginModal onLoginSuccess={handleLoginSuccess} />;
  }

  /**
   * Handles dataset selection and updates the backend with the selected datasets.
   * Also refreshes the dataset display and user count after selection.
   */
  const handleCompareDatasets = async () => {
    if (dataset1 && dataset2) {
      
      // Save selected datasets to backend
      await handleSaveActiveDatasets();

      // Display success message
      setSuccessMessage("Datasets selected successfully!");
      setTimeout(() => {
        setSuccessMessage(""); 
      }, 5000);

      
      // Refresh dataset list and user counts
      await fetchDatasets();
    } else {
      console.log("Please select both datasets to compare.");
    }
  };

   /**
   * Updates the backend with the selected datasets by sending a POST request.
   * Ensures only the selected datasets are marked as active.
   */
  const handleSaveActiveDatasets = async () => {
    // Update dataset state to reflect active selection
    const updatedDatasets = datasets.map((dataset) => ({
      ...dataset,
      dataset_is_active: dataset.dataset_title === dataset1 || dataset.dataset_title === dataset2,
    }));
  
    // Prepare request payload
    const selectedDatasets = { datasets: updatedDatasets };
  
    try {
      const response = await fetch("https://pm-vis.uni-mannheim.de/api/admin/datasets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedDatasets),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update active datasets.");
      }
  
      // log the successful message
      console.log(response.message);

       // Re-sort the datasets to show active ones at the top (kind of refresh of dropdown list)
      const sortedDatasets = [...updatedDatasets].sort((a, b) => {
        if (a.dataset_is_active && !b.dataset_is_active) return -1;
        if (!a.dataset_is_active && b.dataset_is_active) return 1;
        return 0;
      });

      setDatasets(sortedDatasets);
    } catch (error) {
      console.error("Error saving active datasets:", error);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>Admin Dashboard - ProVi</title>
      </Head>
      <Navigation />

      {/* User count display for selected datasets */}
      <div className="p-4 text-center">
        <div className="flex justify-around mt-6">
          <p className="text-xl font-semibold">{dataset1} Users: {userCountDataset1}</p>
          <p className="text-xl font-semibold">{dataset2} Users: {userCountDataset2}</p>
        </div>
      </div>

      <main>
      {/* Dataset selection UI */}
        <section className="p-12 m-12 mx-auto bg-white rounded-md shadow-md max-w-7xl">
          <h1 className="mb-8 text-2xl font-bold text-center">
            Choose the two Datasets to compare
          </h1>

          <div className="flex items-center justify-center gap-8">
            <div>
              <label
                htmlFor="dataset1"
                className="block mb-2 text-lg font-semibold"
              >
                Dataset 1
              </label>
              <select
                id="dataset1"
                value={dataset1}
                onChange={(e) => setDataset1(e.target.value)}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              >
                {datasets.map((dataset) => (
                  <option key={dataset.dataset_id} value={dataset.dataset_title}>
                    {dataset.dataset_title}
                    {dataset.dataset_is_active ? " (Active)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-lg font-bold">compare to</div>

            <div>
              <label
                htmlFor="dataset2"
                className="block mb-2 text-lg font-semibold"
              >
                Dataset 2
              </label>
              <select
                id="dataset2"
                value={dataset2}
                onChange={(e) => setDataset2(e.target.value)}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              >
                {datasets
                  .filter((dataset) => dataset.dataset_title !== dataset1) // Exclude the selected Dataset 1
                  .map((dataset) => (
                    <option key={dataset.dataset_id} value={dataset.dataset_title}>
                      {dataset.dataset_title}
                      {dataset.dataset_is_active ? " (Active)" : ""}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleCompareDatasets}
              className="px-8 py-3 font-semibold text-white transition duration-300 bg-green-500 rounded-full shadow-md hover:bg-green-600"
            >
              Use these 2 datasets
            </button>
          </div>
          <br/>
          {/* Success message display */}
          {successMessage && (
            <div className="bg-green-100 text-green-700 p-4 rounded-md">
              {successMessage}
            </div>
          )}
        </section>

        {/* Upload & Download sections */}
        <div className="flex gap-8 mx-auto max-w-7xl">
          <div className="flex flex-col flex-1 gap-4 py-12">
            <h1 className="text-2xl font-bold">Upload Datasets</h1>
            <DatasetUploadBox title="Upload Dataset" refreshDatasetList={fetchDatasets} />
          </div>
          <div className="flex flex-col flex-1 gap-4 py-12">
            <h1 className="text-2xl font-bold">Upload/ Change Questionnaire</h1>
            <QuestionnaireUploadBox title="Upload/Change Questionnaire" />
          </div>
        </div>
        <div className="h-8"></div>
        <h1 className="text-2xl font-bold text-center">
          Download all collected Data
        </h1>
        <div className="grid flex-grow grid-cols-1 gap-8 p-16 md:grid-cols-3">
          <DownloadBox title="Download Questionnaire Data" />
          <DownloadBox title="Download UI Tracking Data" />
          <DownloadBox title="Download User Data" />
        </div>
      </main>
    </div>
  );
}
