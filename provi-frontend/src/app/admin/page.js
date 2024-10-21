"use client";

import Head from 'next/head';
import Link from 'next/link';

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>Admin - ProVi</title>
      </Head>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">ProVi</div>
        <div>
          <Link href="/" className="mx-4 text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/about" className="mx-4 text-gray-600 hover:text-gray-900">About</Link>
          <a href="#" className="mx-4 text-gray-600 hover:text-gray-900">FAQ</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload/Change Dataset A */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-4">Upload/Change Dataset A</h2>
          <div className="bg-gray-100 p-4 rounded-md flex items-center justify-center h-32 mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">New Upload</button>
          </div>
          <div className="text-gray-600">Current Dataset: </div>
        </div>

        {/* Upload/Change Dataset B */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-4">Upload/Change Dataset B</h2>
          <div className="bg-gray-100 p-4 rounded-md flex items-center justify-center h-32 mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">New Upload</button>
          </div>
          <div className="text-gray-600">Current Dataset:</div>
        </div>

        {/* Upload Questionnaire A */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-4">Upload Questionnaire A</h2>
          <div className="flex items-center gap-4 mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>
            <div className="text-gray-600">Current Dataset: </div>
          </div>
        </div>

        {/* Upload Questionnaire B */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-4">Upload Questionnaire B</h2>
          <div className="flex items-center gap-4 mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>
            <div className="text-gray-600">Current Dataset: </div>
          </div>
        </div>

        {/* Download Survey Data Dataset A */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-4">Download Survey Data Dataset A</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Download</button>
        </div>

        {/* Download Survey Data Dataset B */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-4">Download Survey Data Dataset B</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Download</button>
        </div>
      </main>
    </div>
  );
}
