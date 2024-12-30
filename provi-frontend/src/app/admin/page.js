"use client";

import Head from 'next/head';
import Link from 'next/link';

import { useState } from 'react';


import DatasetUploadBox from '../../components/Admin/DatasetUploadBox';
import QuestionnaireUploadBox from '../../components/Admin/QuestionnaireUploadBox';
import DownloadBox from '../../components/Admin/DownloadBox';

export default function AdminPage() {

  const [dataset1, setDataset1] = useState('');
  const [dataset2, setDataset2] = useState('');


  const handleCompareDatasets = () => {
    if (dataset1 && dataset2) {
      console.log(`Comparing Dataset 1: ${dataset1} with Dataset 2: ${dataset2}`);
      // H add logic to perform the comparison, API calls, etc.
    } else {
      console.log('Please select both datasets to compare.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>Admin Dashboard - ProVi</title>
      </Head>
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">ProVi</div>
        <div>
        <Link href="/home" className="mx-4 text-gray-600 hover:text-gray-900">Home</Link> 
          <Link href="/admin" className="mx-4 text-gray-600 hover:text-gray-900">Admin</Link>
          <Link href="/about" className="mx-4 text-gray-600 hover:text-gray-900">About</Link>
          <Link href="" className="mx-4 text-gray-600 hover:text-gray-900">FAQ</Link>
        </div>
      </nav>
      
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold">Hi, welcome back!</h1>
        <br/>
        <div className="flex justify-around mt-6">
          <p className="text-xl font-semibold">Total user Mental Map: 12</p>
          <p className="text-xl font-semibold">Total user normal DFG: 9</p>
        </div>
      </div>
      

      <main >
        <section className="bg-white m-12 p-12 shadow-md rounded-md max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Choose the two Datasets to compare</h1>

        <div className="flex items-center justify-center gap-8">
          <div>
            <label htmlFor="dataset1" className="block text-lg font-semibold mb-2">
              Dataset 1
            </label>
            <select
                id="dataset1"
                value={dataset1}
                onChange={(e) => setDataset1(e.target.value)}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              >
              <option>Mental Map Dataset 1</option>
              <option>Mental Map Dataset 2</option>
              <option>Mental Map Dataset 3</option>
              <option>DFG Dataset 1</option>
              <option>DFG Dataset 2</option>
              <option>DFG Dataset 3</option>
            </select>
          </div>

          <div className="font-bold text-lg">compare to</div>

          <div>
            <label htmlFor="dataset2" className="block text-lg font-semibold mb-2">
              Dataset 2
            </label>
            <select
                id="dataset2"
                value={dataset2}
                onChange={(e) => setDataset2(e.target.value)}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              > 
              <option>Mental Map Dataset 1</option>
              <option>Mental Map Dataset 2</option>
              <option>Mental Map Dataset 3</option>
              <option>DFG Dataset 1</option>
              <option>DFG Dataset 2</option>
              <option>DFG Dataset 3</option>
            </select>
          </div>
        </div>

        
        <div className="mt-8 flex justify-center">
            <button
              onClick={handleCompareDatasets}
              className="bg-green-500 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-green-600 transition duration-300"
            >
              Use these 2 datasets
            </button>
          </div>
      </section>

      <div className="flex gap-8 max-w-7xl mx-auto">
        
          <div className="flex-1 flex flex-col gap-4 py-12">
            <h1 className="text-2xl font-bold">Upload Datasets</h1>
            <DatasetUploadBox title="Upload Dataset" />
          </div>


          <div className="flex-1 flex flex-col gap-4 py-12">
            <h1 className="text-2xl font-bold">Upload/ Change Questionnaire</h1>
            <QuestionnaireUploadBox title="Upload/Change Questionnaire" />
          </div>
        </div>


        <div className="h-8"></div>
        <h1 className="text-2xl font-bold text-center">Download all collected Data</h1>
        <div className="flex-grow p-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <DownloadBox title="Download Questionnaire Data" />
          <DownloadBox title="Download UI Tracking Data" />
          <DownloadBox title="Download User Data" />
        </div>
        
      </main>
    </div>
  );
}