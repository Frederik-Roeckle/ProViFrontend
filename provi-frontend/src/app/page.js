"use client";

import Head from 'next/head';
import GraphVisualComponent from '../components/Graph/GraphVisualComponent';
import QuestionnaireComponent from '../components/Questionnaire/QuestionnaireComponent';
import SliderBoxComponent from '../components/Graph/SliderBoxComponent';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>ProVi - Directly Follows Graph</title>
      </Head>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">ProVi</div>
        <div>
          <Link href="/admin" className="mx-4 text-gray-600 hover:text-gray-900">Admin</Link>
          <Link href="/about" className="mx-4 text-gray-600 hover:text-gray-900">About</Link>
          <a href="#" className="mx-4 text-gray-600 hover:text-gray-900">FAQ</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section - Placeholder for DFG Graph */}
        <GraphVisualComponent />

        {/* Right Section - Placeholder for Questionnaire */}
        <div className="flex flex-col gap-8 h-full">
          <SliderBoxComponent />
          <QuestionnaireComponent />
        </div>
      </main>
    </div>
  );
}