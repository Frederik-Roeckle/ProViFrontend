import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Link from 'next/link';
import { CTooltip } from '@coreui/react';

const questionsCsv = `Question ID,Question Text,Answer Type,Options
14,"What is this process about?",multiple choice,"Finance|Healthcare|HR|Logistic"
15,"Would you rate this process as a spaghetti or lasagne process?",multiple choice,"Spaghetti|Lasagne"
16,"How many activities does this process entail?",text,
17,"What is the most frequent process variant? (See more in mock-up)",multiple choice,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
18,"Select all possible start activities.",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
19,"Select all possible end activities.",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
20,"What activity/activities occur more than 4.000 times?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
21,"What activity/activities occur less than 4.000 times but more than 990 times?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
22,"What activity/activities occur less than 900 times?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
23,"Can you identify rework in the process?",multiple choice,"Yes|No"
23.1,"If yes, what activity/activities is/are affected by it?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
24,"What activities follow the activity 'Create Return Instructions'?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
`;

// const questionsCsv = `Question ID,Question Text,Answer Type,Options
// 1,"What activities do you think are redundant?",text,
// 2,"Which of the following activities should be optimized?",multiple choice,"Activity A|Activity B|Activity C"
// 3,"How would you rate the efficiency of the current process?",rating,
// 4,"Which activities do you find the most problematic?",multiple select,"Activity A|Activity B|Activity C|Activity D"
// `;

const QuestionnaireComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const parseQuestions = () => {
      Papa.parse(questionsCsv, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setQuestions(result.data);
          setAnswers(new Array(result.data.length).fill(''));
        },
      });
    };
    parseQuestions();
  }, []);

  const handleNextQuestion = () => {
    if (currentAnswer === '' || (Array.isArray(currentAnswer) && currentAnswer.length === 0)) {
      alert('Please answer the question before proceeding.');
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(updatedAnswers);

    setCurrentAnswer(answers[currentQuestionIndex + 1] || '');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-white p-6 shadow-md rounded-md h-full w-full flex flex-col gap-4">
      {currentQuestion ? (
        <div className="flex flex-col gap-4 h-full">
          <h2 className="text-lg font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
          <div className="flex items-center gap-2">
            <p>{currentQuestion['Question Text']}</p>
            {currentQuestion['Tooltip'] && (
              <CTooltip
                content={currentQuestion['Tooltip']}
                placement="top"
              >
                <span className="text-sm text-gray-500 cursor-pointer">ℹ️</span>
              </CTooltip>
            )}
          </div>
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
          <div className="flex justify-end mt-4">
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
