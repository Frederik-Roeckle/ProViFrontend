"use client";

/**
 * PrequestionPage
 *
 * This page is responsible for rendering the pre-experiment questions (hardcoded)
 * before users can proceed to the knowledge questions. Answers are also sent to the backend.
 * 
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import AlertPopup from '../../components/Questionnaire/AlertPopup';
import ScrollProgressBar from "../../components/WelcomePage/ScrollProgressBar";

import "@coreui/coreui/dist/css/coreui.min.css";

export default function PrequestionComponent() {
  const [questions, setQuestions] = useState([]); // Stores the list of questions
  const [answers, setAnswers] = useState({}); // Stores user responses
  const [showModal, setShowModal] = useState(false); // Controls the visibility of the alert modal
  const [alertMessage, setAlertMessage] = useState(""); // Stores alert messages
  const router = useRouter();

    /**
   * Predefined CSV data containing pre-experiment questions.
   */
  const csvData = `
      id,type,question,options
      1,multiple,What gender do you identify yourself with?,"Female;Male;None of the above;Prefer not to answer"
      2,open,How old are you?,
      3,multiple,What is your professional background?,"Researcher;Student (Bachelor/Master);Practitioner"
      4,multiple,How long have you been involved with Process Mining?,"Less than a month;Less than a year;Less than 3 years;3 years or longer"
      5,multiple,How often do you work on Process Mining tasks or with Process Mining tools?,"Daily;Monthly;Less frequent than monthly;Never"
      6,multiple,How would you rate your Process Mining expertise level?,"Basic;Advanced;Expert"
  `;


  /**
   * Parses CSV data and stores it in the `questions` state.
   * Each question is structured with an ID, question text, type, and possible answer options.
   */
  useEffect(() => {
    const parsedData = Papa.parse(csvData.trim(), { header: true }).data;
    const formattedQuestions = parsedData.map((question) => ({
      ...question,
      id: String(question.id), // Ensure IDs are strings for consistent comparison
      options: question.options
        ? question.options.split(";").map((opt) => opt.trim())
        : [],
    }));
    setQuestions(formattedQuestions);
  }, []);


  /**
   * Updates the `answers` state when a user gives an answer.
   * */
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

   /**
   * Handles form submission which means ensuring that all questions are answered.
   * Sends the responses to the backend redirects the user to the knowledge questions page upon success.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Identify unanswered questions
    const unansweredQuestions = questions.filter((q) => {
      const answer = answers[q.id];
      if (q.type === "open") {
        return !answer || answer.trim() === "";
      }
      return !answer;
    });

    // Display an alert if there are unanswered questions
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

    // Structure the answers into an ordered format for submission
    const orderedAnswers = questions.map(question => ({
      questionId: question.id,
      answer: answers[question.id]
    }));

    // Map answers to the required backend keys in the correct order
    const sendData = {
      gender: orderedAnswers[0].answer,
      age: parseInt(orderedAnswers[1].answer),
      professional_background: orderedAnswers[2].answer,
      experience_time_process_mining: orderedAnswers[3].answer,
      frequency_process_mining: orderedAnswers[4].answer,
      expertise_level_process_mining: orderedAnswers[5].answer,
    };

    try {
      const response = await fetch("https://pm-vis.uni-mannheim.de/api/auth/", {
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

      console.log("Data successfully submitted:", sendData);
      router.push("/knowledgequestion");
    } catch (error) {
      setAlertMessage(`An unexpected error occurred: ${error.message}`);
      setShowModal(true);
    }
  };

  return (
    <div className="bg-gray-50 p-10 shadow-xl rounded-lg h-auto w-3/5 mx-auto flex flex-col gap-10 items-center justify-center">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />
      <h1 className="text-3xl font-bold">Process Visualization Experiment</h1>
      
      {/* Alert Popup for Validation Messages */}
      <AlertPopup
        visible={showModal}
        message={alertMessage}
        onClose={() => setShowModal(false)}
      />

      {/* Introduction Text */}
      <p className="text-xl mt-6">
      In the following part I kindly ask you to answer the 6 Pre-Experiment Questions. This is followed by 7 Knowledge Questions.
      </p>

      {/* Question List */}
      <div className="flex flex-col gap-6 mt-6">
        <h2 className="text-3xl font-semibold">Pre-Experiment Questions</h2>
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
                      onChange={(e) => handleAnswerChange(q.id, option)}
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
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                className="border p-2 rounded w-full text-m"
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="px-10 py-3 rounded-lg mt-4 self-center bg-blue-500 text-white hover:bg-blue-600"
      >
        Enter Knowledge Questions
      </button>
      <br/>
    </div>
  );
}