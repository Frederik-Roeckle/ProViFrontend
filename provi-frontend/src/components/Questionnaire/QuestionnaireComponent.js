import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Link from "next/link";
import { CTooltip } from "@coreui/react"; // not needed yes could be left out i think
// import AlertPopup from './AlertPopup';  not possible need to be done on the mainpage and not in the subcomponent

const questionsCsv = `Question ID,Question Text,Answer Type,Options
14,"What is this process about?",multiple choice,"Finance|Healthcare|HR|Logistic"
15,"Would you rate this process as a spaghetti or lasagne process?",multiple choice,"Spaghetti|Lasagne"
16,"How many activities does this process entail?",numeric,
17,"What is the most frequent process variant? (See more in mock-up)",order question,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
18,"Select all possible start activities.",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
19,"Select all possible end activities.",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
20,"What activity/activities occur more than 4.000 times?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
21,"What activity/activities occur less than 4.000 times but more than 990 times?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
22,"What activity/activities occur less than 900 times?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
23,"Can you identify rework in the process?",follow-up question,"Yes|No"
24,"If yes, what activity/activities is/are affected by it?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
25,"What activities follow the activity 'Create Return Instructions'?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
26,"Is the following sequence a possible path in the DFG? \n\n 'Check Availability' -> 'Pack Items' -> 'Send Package' -> 'Update Order Status' -> 'Archive Order'",multiple choice,"Yes|No"
27,"Is the following sequence a possible path in the DFG? \n\n 'Check Availability' -> 'Notify Customer'",multiple choice,"Yes|No"
28,"Is the following sequence a possible path in the DFG? \n\n 'Check Availability' -> 'Pack Items' -> 'Notify Customer' -> 'Notify Customer'",multiple choice,"Yes|No"
29,"Is the following sequence a possible path in the DFG? \n\n'Pack Items' -> 'Send Package' -> 'Update Order Status' -> 'Create Return Instructions' -> 'Select Delivery Date' -> 'Notify Customer'",multiple choice,"Yes|No"
30,"Is the following sequence a possible path in the DFG? \n\n 'Check Availability' -> 'Pack Items' -> 'Create Delivery Note' -> 'Create Return Instructions' -> 'Create Invoice' -> 'Notify Customer'",multiple choice,"Yes|No"
31,"Is the following sequence a possible path in the DFG? \n\n 'Check Availability' -> 'Pack Items' -> 'Update Order Status' -> 'Archive Order'",multiple choice,"Yes|No"
32,"On a scale from 1 (easy) -7 (difficult), how difficult was it to answer the questions?",multiple choice,"1|2|3|4|5|6|7"
`;

// const questionsCsv = `Question ID,Question Text,Answer Type,Options
// 1,"What activities do you think are redundant?",text,
// 2,"Which of the following activities should be optimized?",multiple choice,"Activity A|Activity B|Activity C"
// 3,"How would you rate the efficiency of the current process?",rating,
// 4,"Which activities do you find the most problematic?",multiple select,"Activity A|Activity B|Activity C|Activity D"
// `;

// question type: follow-up question: special case: base question if answer yes-> normal routing to subquestion (right after base question in csv)
//                                                                if answer no -> skip next question (adds 2 to index)
// exampple base: id:23, follow-up question: id:24

const QuestionnaireComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // parses the question csv to json
  useEffect(() => {
    const parseQuestions = () => {
      Papa.parse(questionsCsv, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setQuestions(result.data);
          setAnswers(new Array(result.data.length).fill(""));
        },
      });
    };
    parseQuestions();
  }, []);

  // handles the next question button, saves answers
  const handleNextQuestion = () => {
    if (
      currentAnswer === "" ||
      (Array.isArray(currentAnswer) && currentAnswer.length === 0)
    ) {
      alert("Please answer the question.");
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(updatedAnswers);

    // logic for follow-up queation if No -> skip the next question
    if (
      currentQuestion["Answer Type"] === "follow-up question" &&
      currentAnswer === "No"
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 2);
      setCurrentAnswer("");
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer(answers[currentQuestionIndex + 1] || ""); // Pre-fill answer if already answered
    }
  };

  // for question 17 => method handling the order selection + function to count the already used numbers (no double numbers allowed)
  const handleDropdownChange = (value, item) => {
    const updatedAnswer = { ...currentAnswer, [item]: value };
    setCurrentAnswer(updatedAnswer);
  };

  const getUsedNumbers = () => Object.values(currentAnswer);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col w-full h-full gap-4 p-6 bg-white rounded-md shadow-md">
      {currentQuestion ? (
        <div className="flex flex-col h-full gap-4">
          <h2 className="text-lg font-semibold">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <div className="flex items-center gap-2">
            <p>
              {currentQuestion["Question Text"]
                .split("\n")
                .map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index <
                      currentQuestion["Question Text"].split("\n").length -
                        1 && <br />}
                  </React.Fragment>
                ))}
            </p>
            {currentQuestion["Tooltip"] && (
              <CTooltip content={currentQuestion["Tooltip"]} placement="top">
                <span className="text-sm text-gray-500 cursor-pointer">ℹ️</span>
              </CTooltip>
            )}
          </div>

          {currentQuestion["Answer Type"] === "text" && (
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter a text"
              rows={3}
            />
          )}
          {currentQuestion["Answer Type"] === "numeric" && (
            <input
              type="number"
              value={currentAnswer}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setCurrentAnswer(value);
                }
              }}
              className="w-full p-2 border rounded-md"
              placeholder="Enter a number"
            />
          )}

          {(currentQuestion["Answer Type"] === "multiple choice" ||
            currentQuestion["Answer Type"] === "follow-up question") && (
            <div className="flex flex-col gap-2">
              {currentQuestion["Options"].split("|").map((option, index) => (
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
          {currentQuestion["Answer Type"] === "multiple select" && (
            <div className="flex flex-col gap-2">
              {currentQuestion["Options"].split("|").map((option, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="question-option"
                    value={option}
                    checked={
                      Array.isArray(currentAnswer) &&
                      currentAnswer.includes(option)
                    }
                    onChange={(e) => {
                      const updatedAnswers = Array.isArray(currentAnswer)
                        ? [...currentAnswer]
                        : [];
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
          {currentQuestion["Answer Type"] === "order question" && (
            <div className="flex flex-col gap-4">
              {currentQuestion["Options"].split("|").map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2"
                >
                  <p className="flex-grow">{option}</p>
                  <select
                    value={currentAnswer[option] || ""}
                    onChange={(e) =>
                      handleDropdownChange(e.target.value, option)
                    }
                    className="p-2 border rounded-md"
                  >
                    <option value="">Order</option>
                    {[...Array(currentQuestion["Options"].split("|").length)]
                      .map((_, i) => i + 1)
                      .map((order) => (
                        <option
                          key={order}
                          value={order}
                          disabled={getUsedNumbers().includes(order.toString())}
                        >
                          {order}
                        </option>
                      ))}
                  </select>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end mt-4">
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
              >
                Next Question
              </button>
            ) : (
              <Link href="/endpage" passHref>
                <button className="px-4 py-2 text-white bg-blue-500 rounded-md">
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
