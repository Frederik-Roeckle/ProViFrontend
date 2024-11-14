"use client";

import Head from "next/head";
import Link from "next/link";

import GraphVisualComponent from "../../components/Graph/GraphVisualComponent";
import QuestionnaireComponent from "../../components/Questionnaire/QuestionnaireComponent";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>ProVi - Directly Follows Graph</title>
      </Head>
      {/* Navigation Bar with Admin About and FAQ Button */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <div className="text-xl font-bold">ProVi</div>
        <div>
          <Link href="/home" className="mx-4 text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link
            href="/admin"
            className="mx-4 text-gray-600 hover:text-gray-900"
          >
            Admin
          </Link>
          <Link
            href="/about"
            className="mx-4 text-gray-600 hover:text-gray-900"
          >
            About
          </Link>
          <Link href="" className="mx-4 text-gray-600 hover:text-gray-900">
            FAQ
          </Link>
        </div>
      </nav>

      {/* Main Content for DFG and Questionnaire*/}
      <main className="flex-grow p-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        {/* Left : DFG Graph + Sliders*/}
        <div className="h-full">
          <GraphVisualComponent />
        </div>

        {/* Right: Questionnaire */}
        <div className="flex flex-col gap-8 h-[60%]">
          <QuestionnaireComponent />
        </div>
      </main>
    </div>
  );
}
