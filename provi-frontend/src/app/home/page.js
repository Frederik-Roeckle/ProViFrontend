"use client";

import Head from "next/head";
import Link from "next/link";

import GraphVisualComponent from "../../components/Graph/GraphVisualComponent";
import QuestionnaireComponent from "../../components/Questionnaire/QuestionnaireComponent";
import Navigation from "../../components/General/Navigation";
import { UITrackingProvider } from "../../utils/usertracking";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>ProVi - Directly Follows Graph</title>
      </Head>
      {/* Navigation Bar with Admin About and FAQ Button */}
      <Navigation />

      {/* Main Content for DFG and Questionnaire*/}
      <main className="flex-grow p-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        {/* Left : DFG Graph + Sliders*/}
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
    </div>
  );
}
