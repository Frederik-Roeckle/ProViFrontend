"use client";

import Head from 'next/head';
import Link from 'next/link';
import UploadDataset from '../../components/Admin/UploadDataset';
import UploadQuestionnaire from '../../components/Admin/UploadQuestionnaire';
import DownloadSurvey from '../../components/Admin/DownloadSurvey';

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
        <UploadDataset datasetLabel="Dataset A" datasetName="Example1.xes" />
        <UploadQuestionnaire questionnaireLabel="Questionnaire A" questionnaireName="Questions1.txt" />
        <DownloadSurvey surveyLabel="Survey Data Dataset A" />
      </main>
    </div>
  );
}
