"use client";

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Link from 'next/link';
import { logEvent } from '../Graph/logger';

const questionsCsv = `Question ID,Question Text,Answer Type,Options
1,"What activities do you think are redundant?",text,
2,"Which of the following activities should be optimized?",multiple choice,"Activity A|Activity B|Activity C"
3,"How would you rate the efficiency of the current process?",rating,
4,"Which activities do you find the most problematic?",multiple select,"Activity A|Activity B|Activity C|Activity D"
`;

const QuestionnaireComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(new Date()); // State to track the start time of each question

  useEffect(() => {
    const parseQuestions = () => {
      Papa.parse(questionsCsv, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setQuestions(result.data);
          //setAnswers(new Array(result.data.length).fill(''));
        },
      });
    };
    parseQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      logEvent(`Question ${currentQuestionIndex + 1} Started`, 'Questionnaire', 'null');
    }
  }, [currentQuestionIndex, questions]);

  const handleNextQuestion = () => {
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // Calculate time taken in seconds
    logEvent(`Question ${currentQuestionIndex + 1} ended`, "Questionnaire", `${timeTaken}`);
    const question = questions[currentQuestionIndex];
    const answerData = {
      questionId: question['Question ID'],
      //questionText: question['Question Text'],
      answer: currentAnswer,
      timeTaken,
    }
    // Log the answer
    logEvent('Answer Submitted', 'Questionnaire', answerData);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(updatedAnswers);

    setCurrentAnswer(answers[currentQuestionIndex + 1] || '');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setStartTime(new Date()); // Reset start time for the next question
    }
  };

  const handlePreviousQuestion = () => {
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // Calculate time taken in seconds
    //logEvent("Previous Question", "Questionnaire", `Question ${currentQuestionIndex + 1} answered in ${timeTaken} seconds`);

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(updatedAnswers);

    setCurrentAnswer(answers[currentQuestionIndex - 1] || '');
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setStartTime(new Date()); // Reset start time for the previous question
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-white p-6 shadow-md rounded-md h-full w-full flex flex-col gap-4">
      {currentQuestion ? (
        <div className="flex flex-col gap-4 h-full">
          <h2 className="text-lg font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
          <p>{currentQuestion['Question Text']}</p>
          {currentQuestion['Answer Type'] === 'text' && (
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={3}
            />
          )}
          {currentQuestion['Answer Type'] === 'multiple choice' && (
            <div className="flex flex-col gap-2">
              {currentQuestion['Options'].split('|').map((option, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="question-option"
                    value={option}
                    checked={currentAnswer === option}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    className="w-4 h-4"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
          {currentQuestion['Answer Type'] === 'multiple select' && (
            <div className="flex flex-col gap-2">
              {currentQuestion['Options'].split('|').map((option, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="question-option"
                    value={option}
                    checked={Array.isArray(currentAnswer) && currentAnswer.includes(option)}
                    onChange={(e) => {
                      const updatedAnswers = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
                      if (e.target.checked) {
                        updatedAnswers.push(option);
                      } else {
                        const optionIndex = updatedAnswers.indexOf(option);
                        if (optionIndex > -1) {
                          updatedAnswers.splice(optionIndex, 1);
                        }
                      }
                      setCurrentAnswer(updatedAnswers);
                    }}
                    className="w-4 h-4"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
          {currentQuestion['Answer Type'] === 'rating' && (
            <div className="flex gap-4">
              {['Really Bad', 'Bad', 'Neutral', 'Good', 'Really Good'].map((rating, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="rating-option"
                    value={rating}
                    checked={currentAnswer === rating}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    className="w-4 h-4"
                  />
                  {rating}
                </label>
              ))}
            </div>
          )}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousQuestion}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              disabled={currentQuestionIndex === 0}
            >
              Previous Question
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Next Question
              </button>
            ) : (
              <Link href="/endpage" passHref>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Finish
                </button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default QuestionnaireComponent;