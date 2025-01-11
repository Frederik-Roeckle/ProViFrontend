"use client";

import Head from "next/head";
import { useEffect, useState } from "react";

import DatasetUploadBox from "../../components/Admin/DatasetUploadBox";
import QuestionnaireUploadBox from "../../components/Admin/QuestionnaireUploadBox";
import DownloadBox from "../../components/Admin/DownloadBox";
import Navigation from "../../components/General/Navigation";

export default function AdminPage() {
  const [datasets, setDatasets] = useState([]); // To store datasets from backend
  const [dataset1, setDataset1] = useState(""); // Selected dataset 1
  const [dataset2, setDataset2] = useState(""); // Selected dataset 2

  // Fetch datasets from the backend when the page loads
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch("https://pm-vis.uni-mannheim.de/api/admin/datasets");
        const data = await response.json();

        // Sort datasets to have active datasets at the top
        const sortedDatasets = [...data].sort((a, b) => {
          if (a.dataset_is_active && !b.dataset_is_active) return -1;
          if (!a.dataset_is_active && b.dataset_is_active) return 1;
          return 0;
        });

        // Set default selected datasets to the first two active datasets
        const activeDatasets = sortedDatasets.filter((dataset) => dataset.dataset_is_active);
        setDataset1(activeDatasets[0]?.dataset_title || "");
        setDataset2(activeDatasets[1]?.dataset_title || "");

        setDatasets(sortedDatasets);
      } catch (error) {
        console.error("Error fetching datasets:", error);
      }
    };

    fetchDatasets();
  }, []);

  const handleCompareDatasets = async () => {
    if (dataset1 && dataset2) {
      console.log(`Comparing Dataset 1: ${dataset1} with Dataset 2: ${dataset2}`);
      
      // Call the method to save the active datasets to the backend
      await handleSaveActiveDatasets();
      
      console.log("Active datasets have been updated successfully!");
    } else {
      console.log("Please select both datasets to compare.");
    }
  };

  const handleSaveActiveDatasets = async () => {
    // Prepare the updated dataset list
    const updatedDatasets = datasets.map((dataset) => ({
      ...dataset,
      dataset_is_active: dataset.dataset_title === dataset1 || dataset.dataset_title === dataset2,
    }));
  
    // Construct the response with the active datasets
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
  
      console.log("Active datasets updated successfully.");

       // Re-sort the datasets to show active ones at the top (kind of refresh of dropdown list)
      const sortedDatasets = [...updatedDatasets].sort((a, b) => {
        if (a.dataset_is_active && !b.dataset_is_active) return -1;
        if (!a.dataset_is_active && b.dataset_is_active) return 1;
        return 0;
      });

      // Update the state with the re-sorted datasets
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

      <div className="p-4 text-center">
        <div className="flex justify-around mt-6">
          <p className="text-xl font-semibold">Total user Mental Map: 12</p>
          <p className="text-xl font-semibold">Total user normal DFG: 9</p>
        </div>
      </div>

      <main>
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
        </section>

        <div className="flex gap-8 mx-auto max-w-7xl">
          <div className="flex flex-col flex-1 gap-4 py-12">
            <h1 className="text-2xl font-bold">Upload Datasets</h1>
            <DatasetUploadBox title="Upload Dataset" />
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
