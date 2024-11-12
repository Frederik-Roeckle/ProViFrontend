"use client";

import Head from 'next/head';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>About ProVi</title>
      </Head>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">ProVi</div>
        <div>
          <a href="/home" className="mx-4 text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="mx-4 text-gray-600 hover:text-gray-900">FAQ</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-8 flex items-center justify-center">
        <div className="bg-white p-6 shadow-md rounded-md max-w-3xl">
          <h1 className="text-2xl font-bold mb-4">About ProVi</h1>
          <p className="text-gray-600 mb-4">
            Welcome to ProVi! This page is dedicated to providing information about the ProVi project. Enter any necessary information.
          </p>
          <p className="text-gray-600 mb-4">
            Placeholder content: ProVi is a project aimed at visualizing directly-follow graphs and providing user interactions for educational purposes. The goal is to make process mining more accessible and understandable through interactive visual tools.
          </p>
          <p className="text-gray-600">
            Please feel free to explore the other sections of the website for more details about the features and functionalities provided by ProVi.
          </p>
        </div>
      </main>
    </div>
  );
}