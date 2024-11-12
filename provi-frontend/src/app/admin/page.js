"use client";

import Head from 'next/head';
import Link from 'next/link';


import UploadBox from '../../components/Admin/UploadBox';
import DownloadBox from '../../components/Admin/DownloadBox';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>Admin Dashboard - ProVi</title>
      </Head>
      {/*Navigation Bar with admin, about and faq*/}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">ProVi</div>
        <div>
        <Link href="/home" className="mx-4 text-gray-600 hover:text-gray-900">Home</Link> 
          <Link href="/admin" className="mx-4 text-gray-600 hover:text-gray-900">Admin</Link>
          <Link href="/about" className="mx-4 text-gray-600 hover:text-gray-900">About</Link>
          <Link href="" className="mx-4 text-gray-600 hover:text-gray-900">FAQ</Link>
        </div>
      </nav>
      
      {/*Header Section for admin panel*/}
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold">Hi, welcome back!</h1>
        <br/>
        <div className="flex justify-around mt-6">
          <p className="text-xl font-semibold">Total user Mental Map: 12</p>
          <p className="text-xl font-semibold">Total user normal DFG: 9</p>
        </div>
      </div>
      
      {/*Main Section for Upload and download*/}
      <main className="flex-grow p-4 grid grid-cols-1 gap-8 md:grid-cols-2">

        {/* Upload/Change Datasetand Questionnaire */}
        <UploadBox title="Upload/Change Dataset" />
        <UploadBox title="Upload/Change Questionnaire" />

        {/* Download Survey Data Mental Map and Normal DFG */}
        <DownloadBox title="Download Survey Data Mental Map" />
        <DownloadBox title="Download Survey Data Normal DFG" />
      </main>
    </div>
  );
}