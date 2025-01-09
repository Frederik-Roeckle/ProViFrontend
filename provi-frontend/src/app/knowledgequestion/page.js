"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import AlertPopup from '../../components/Questionnaire/AlertPopup';
import ScrollProgressBar from "../../components/WelcomePage/ScrollProgressBar";

import "@coreui/coreui/dist/css/coreui.min.css";

export default function KnowledgeComponent() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const csvData = `
      id,type,question,options
      7,knowledge,What is process mining?,"A data-driven technique that involves cleaning, transforming, and analyzing raw business data to uncover hidden patterns;A method for extracting data from process models to improve workflow efficiency;A method of creating flowcharts and diagrams to represent processes and optimize operations based on interviews and existing documentation;A technique for discovering, monitoring, and improving real processes by extracting knowledge from event logs"
      8,knowledge,What is a spaghetti process?,"A process that is heavily automated and linear;A process that is complex because of many interconnected subprocesses but still follows a clear structure;A highly complex, unstructured process with many variations and loops"
      9,knowledge,What is a process variant?,"A specific activity sequence that corresponds to the course of at least one case in the process;A specific activity sequence that represents the 'happy path' and is expected to be followed by all process instances;A specific activity sequence that is part of a larger process"
      10,knowledge,What are business process models for?,"To track and report the performance of business operations in real-time;To illustrate the organizational hierarchy and reporting structure of an organization;To support organizations in communicating, analyzing, documenting, redesigning, improving, monitoring, or implementing processes"
      11,knowledge,Which of the following answers is NOT a business process modeling notation?,"Petri Net;UML;BPMN;DFG"
      12,knowledge,What is a DFG (Directly-Follows-Graph)?,"A diagram showing every possible path in a process;A graphical notation used to represent business processes, including activities, events, and decision points;A graph that displays the sequence of events directly following each other in a process"
      13,knowledge,Have you ever worked with a DFG?,"Yes;No"
  `;

  useEffect(() => {
    const parsedData = Papa.parse(csvData.trim(), { header: true }).data;
    const formattedQuestions = parsedData.map((question) => ({
      ...question,
      id: String(question.id),
      options: question.options
        ? question.options.split(";").map((opt) => opt.trim())
        : [],
    }));
    setQuestions(formattedQuestions);
  }, []);

  const handleAnswerChange = (e, questionId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const unansweredQuestions = questions.filter((q) => !answers[q.id]);

    if (unansweredQuestions.length > 0) {
      const missingQuestions = unansweredQuestions
        .map((q, index) => `${questions.indexOf(q) + 1}. ${q.question}`)
        .join("\n");

      setAlertMessage(
        `Please answer the following questions before starting the experiment:\n\n${missingQuestions}`
      );
      setShowModal(true);
      return;
    }

    // Create ordered answers using the questions array order
    const orderedAnswers = questions.map(question => ({
      questionId: question.id,
      answer: answers[question.id]
    }));

    // Map the answers to the required format
    const sendData = {
      what_is_process_mining: orderedAnswers[0].answer,
      spaghetti_process: orderedAnswers[1].answer,
      what_is_process_variant: orderedAnswers[2].answer,
      what_are_bpm_for: orderedAnswers[3].answer,
      which_is_not_bpmn: orderedAnswers[4].answer,
      what_is_dfg: orderedAnswers[5].answer,
      worked_with_dfg: orderedAnswers[6].answer
    };

    try {
      const response = await fetch("https://pm-vis.uni-mannheim.de/api/auth/knowledge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(sendData),
      });

      if (!response.ok) {
        setAlertMessage(`Error submitting your answers: ${response.statusText}`);
        setShowModal(true);
        return;
      }

      console.log("Knowledge questions successfully submitted:", sendData);
      router.push("/home");
    } catch (error) {
      setAlertMessage(`An unexpected error occurred: ${error.message}`);
      setShowModal(true);
    }
  };

  return (
    <div className="bg-gray-50 p-10 shadow-xl rounded-lg h-auto w-3/5 mx-auto flex flex-col gap-10 items-center justify-center">
      <ScrollProgressBar />
      <h1 className="text-3xl font-bold">Process Visualization Experiment</h1>
      
      <AlertPopup
        visible={showModal}
        message={alertMessage}
        onClose={() => setShowModal(false)}
      />
        
      <div className="flex flex-col gap-6 mt-6">
        <h2 className="text-3xl font-semibold">Knowledge Questions</h2>
        {questions.map((q, index) => (
          <div key={q.id} className="mb-6">
            <h3 className="font-semibold mb-2 text-2xl">
              {index + 1}. {q.question}
            </h3>
            {q.type === "multiple" || q.type === "knowledge" ? (
              <div>
                {q.options.map((option, idx) => (
                  <label key={idx} className="block text-xl">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      onChange={(e) => handleAnswerChange(e, q.id)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : (
              <input
                type="text"
                name={`question-${q.id}`}
                placeholder="Your answer"
                onChange={(e) => handleAnswerChange(e, q.id)}
                className="border p-2 rounded w-full text-m"
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="px-10 py-3 rounded-lg mt-4 self-center bg-blue-500 text-white hover:bg-blue-600"
      >
        Enter Experiment
      </button>
    </div>
  );
}