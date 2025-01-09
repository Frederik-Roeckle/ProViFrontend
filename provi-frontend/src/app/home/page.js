"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import GraphVisualComponent from "../../components/Graph/GraphVisualComponent";
import QuestionnaireComponent from "../../components/Questionnaire/QuestionnaireComponent";
import Navigation from "../../components/General/Navigation";
import { UITrackingProvider } from "../../utils/usertracking";

export default function Home() {
  const [showPrePage, setShowPrePage] = useState(true);

  const handleStartExperiment = () => {
    setShowPrePage(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>ProVi - Directly Follows Graph</title>
      </Head>

      {/* Navigation Bar */}
      <Navigation />

      {/* Pre-page */}
      {showPrePage ? (
        <div className="flex flex-col items-center justify-center flex-grow p-8 bg-white">
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-4/5 md:w-3/5">
            <h1 className="text-3xl font-bold mb-6 text-center">Welcome to the ProVi Experiment</h1>
            <p className="text-lg leading-relaxed text-center mb-8">
              On the <strong>left</strong>, you can now see the <strong>Directly-Follow-Graph (DFG)</strong> , which will help you answer the upcoming questions. 
              The <strong>two sliders on the right</strong> of the DFG allow you to adjust the <strong>activities shown (upper slider)</strong> and the <strong>number 
              of paths displayed (lower slider)</strong>. At the bottom, you can <strong>zoom in and out</strong> for a closer view of specific activities or paths.
            </p>
            <p className="text-lg leading-relaxed text-center mb-8">
              Feel free to take a moment to explore and familiarize yourself with the DFG and its features. When ready, 
              click 'Start Questionnaire' to proceed to the questions, which will appear on the right one at a time.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleStartExperiment}
                className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Go to Home Page
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Main Content
        <main className="flex-grow p-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
          {/* Left : DFG Graph + Sliders */}
          <UITrackingProvider>
            <div className="h-full">
              <GraphVisualComponent />
            </div>

            {/* Right: Questionnaire */}
            <div className="flex flex-col gap-8">
              <QuestionnaireComponent />
            </div>
          </UITrackingProvider>
        </main>
      )}
    </div>
  );
}
