import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Link from "next/link";
// import AlertPopup from './AlertPopup';  not possible need to be done on the mainpage and not in the subcomponent

const questionsCsv2 = `Question ID,Question Text,Answer Type,Options
1,"What is this process about?",multiple choice,"Finance|Healthcare|HR|Logistic"
2,"Would you rate this process as a spaghetti or lasagne process?",multiple choice,"Spaghetti|Lasagne"
3,"How many activities does this process entail?",numeric,
4,"What is the most frequent process variant?",order question,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
5,"Select all possible start activities.",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
6,"Select all possible end activities.",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
7,"What activity/activities occur more than 4.000 times?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
8,"What activity/activities occur less than 4.000 times but more than 990 times?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
9,"What activity/activities occur less than 900 times?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
10,"Can you identify rework in the process?",follow-up question,"Yes|No"
11,"What activity/activities is/are affected by it?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
12,"What activities follow the activity 'Create Return Instructions'?",multiple select,"Check Availability|Add Voucher|Create Return Instructions|Create Delivery Notes|Create Invoice|Select Delivery Data|Pack Items|Send Package|Update Order Status|Notify Customer|Archive Order"
13,"Is the following sequence a possible path in the DFG? \n\n Check Availability ➔ Pack Items ➔ Send Package ➔ Update Order Status ➔ Archive Order",multiple choice,"Yes|No"
14,"Is the following sequence a possible path in the DFG? \n\n Check Availability ➔ Notify Customer",multiple choice,"Yes|No"
15,"Is the following sequence a possible path in the DFG? \n\n Check Availability ➔ Pack Items ➔ Notify Customer ➔ Notify Customer",multiple choice,"Yes|No"
16,"Is the following sequence a possible path in the DFG? \n\n Pack Items ➔ Send Package ➔ Update Order Status ➔ Create Return Instructions ➔ Select Delivery Date ➔ Notify Customer",multiple choice,"Yes|No"
17,"Is the following sequence a possible path in the DFG? \n\n Check Availability ➔ Pack Items ➔ Create Delivery Note ➔ Create Return Instructions ➔ Create Invoice ➔ Notify Customer",multiple choice,"Yes|No"
18,"Is the following sequence a possible path in the DFG? \n\n Check Availability ➔ Pack Items ➔ Update Order Status ➔ Archive Order",multiple choice,"Yes|No"
`;

// const questionsCsv = `Question ID,Question Text,Answer Type,Options
// 1,"What activities do you think are redundant?",text,
// 2,"Which of the following activities should be optimized?",multiple choice,"Activity A|Activity B|Activity C"
// 3,"How would you rate the efficiency of the current process?",rating,
// 4,"Which activities do you find the most problematic?",multiple select,"Activity A|Activity B|Activity C|Activity D"
// `;

// question type: follow-up question: special case: base question if answer yes-> normal routing to subquestion (right after base question in csv)
//                                                                if answer no -> skip next question (adds 2 to index)
// example base: id:23, follow-up question: id:24




const QuestionnaireComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  

  // parses the question csv to json
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://pm-vis.uni-mannheim.de/api/survey/questionnaire", {
          method: "GET",
          credentials: "include", // Include cookies if needed
          headers: {
            "Content-Type": "text/csv", // Adjust based on API response type
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }

        const csvData = await response.text();
  	    console.log("CSV Data:", csvData);

        // Parse the CSV into a JSON format using PapaParse
        Papa.parse(questionsCsv2, {
          header: true,
          skipEmptyLines: true,
          delimiter: ",",
          quoteChar: '"',
          transformHeader: (header) => header.trim(),
          complete: (result) => {
            setQuestions(result.data);
            setAnswers(new Array(result.data.length).fill(""));
            console.log("Parsed Questions:", result.data);
          },
        });
      } catch (error) {
        console.error("Error fetching questionnaire data:", error);
        
      }
    };
    fetchQuestions();
  }, []);


  // handles the next question button, saves answers
  const handleNextQuestion = async () => {
    // check question 17
    if (
      currentQuestion["Answer Type"] === "order question" &&
      currentAnswer.trim() === ""
    ) {
      alert("Please select at least one option before proceeding.");
      return; // Stop execution if no option is selected
    }

    if (
      currentAnswer === "" ||
      (Array.isArray(currentAnswer) && currentAnswer.length === 0)
    ) {
      alert("Please answer the question.");
      return;
    }

    // questionnaire answer for the POST Call
    const answerQuestion = {
      user_id: "",
      question_id: currentQuestionIndex.toString(),
      answer: currentAnswer.toString(),
      insert_datetime: new Date().toISOString(),
    };
    console.log(answerQuestion);

    try {
      const response = await fetch(
        `https://pm-vis.uni-mannheim.de/api/survey/answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(answerQuestion),
      }
      );
      if (!response.ok) {
        // Extract the error message
        const errorData = await response.json();
        if (errorData.detail) {
          console.error("Validation Error Details:", errorData.detail);
          const errorMessage = errorData.detail
            .map((err) => `${err.msg} (Location: ${err.loc.join(" -> ")})`)
            .join("\n");
          alert(`Error submitting answer:\n${errorMessage}`);
        } else {
          console.error(`Failed to send answer: ${response.status}`);
          alert(`Error submitting answer: ${response.statusText}`);
        }
      } else {
        console.log(
          `Answer submitted successfully for question ${answerQuestion.question_id}`
        );
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("An unexpected error occurred. Please try again.");
    }

    // update the local answer state can be deleted if every answer is sent after each question
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(updatedAnswers);

    // logic for follow-up questions if No -> skip the next question
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
    // Parse the currentAnswer string into an object, or start with an empty object
    const tempAnswers = currentAnswer
      ? Object.fromEntries(
          currentAnswer.split(", ").map((entry) => {
            const [order, option] = entry.split(". ");
            return [option, parseInt(order)];
          })
        )
      : {};
  
    if (value === "") {
      // If value is cleared (changed back to "Order"), remove the item
      delete tempAnswers[item];
    } else {
      // Update the selected order for the current item
      tempAnswers[item] = parseInt(value);
    }
  
    // Convert the updated object back into a sorted formatted string
    const formattedString = Object.entries(tempAnswers)
      .sort(([, orderA], [, orderB]) => orderA - orderB) // Sort by order
      .map(([option, order]) => `${order}. ${option}`) // Format each option
      .join(", "); // Join into a single string
  
    // Update the state with the formatted string
    setCurrentAnswer(formattedString);
  };
  
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col w-full p-6 bg-white rounded-md shadow-md">
      {currentQuestion ? (
        <div className="flex flex-col h-full gap-4">
          <h2 className="text-lg font-semibold">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <div className="flex items-center gap-2">
          <p>
            {currentQuestion && currentQuestion["Question Text"]
              ? currentQuestion["Question Text"].split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < currentQuestion["Question Text"].split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))
              : "Question text is unavailable"}
          </p>

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
                    value={
                      currentAnswer
                        .split(", ")
                        .find((entry) => entry.includes(option))
                        ?.split(". ")[0] || ""
                    } // Extract the number from currentAnswer for this option
                    onChange={(e) => handleDropdownChange(e.target.value, option)}
                    className="p-2 border rounded-md"
                  >
                    <option value="">Order</option>
                    {[...Array(currentQuestion["Options"].split("|").length)]
                      .map((_, i) => i + 1)
                      .map((order) => (
                        <option
                          key={order}
                          value={order}
                          disabled={
                            currentAnswer.split(", ").some((entry) => entry.startsWith(`${order}.`))
                          } // Disable already-selected numbers
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
