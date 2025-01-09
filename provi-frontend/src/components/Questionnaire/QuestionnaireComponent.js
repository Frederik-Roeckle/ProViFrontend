import React, { useState, useEffect, useContext } from "react";
import Papa from "papaparse";
import Link from "next/link";
import { UITrackingContext } from "../../utils/usertracking";

const QuestionnaireComponent = () => {
  const { trackingData, addTrackingChange } = useContext(UITrackingContext);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { clearTrackingData } = useContext(UITrackingContext);

  useEffect(() => {
    console.log("Questionnaire data:", trackingData);
  }, [trackingData]);

  // parses the question csv to json fetch version
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://pm-vis.uni-mannheim.de/api/survey/questionnaire",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "text/csv", // Adjust based on API response type
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }

        const csvData = await response.text();
        console.log("CSV Data:", csvData);

        // Parse the CSV into a JSON format using PapaParse
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          delimiter: ",",
          // quoteChar: '"',
          transformHeader: (header) => header.trim(),
          complete: (result) => {
            const processedData = result.data.map(question => ({
              ...question,
              "Question Text": question["Question Text"]?.replace(/\\n\\n/g, '\n\n')
            }));

            setQuestions(processedData);
            setAnswers(new Array(processedData.length).fill(""));
            console.log("Parsed Questions:", processedData);
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
        clearTrackingData();
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
          <p className="whitespace-pre-line">
            {currentQuestion && currentQuestion["Question Text"]
              ? currentQuestion["Question Text"]
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
                          disabled={currentAnswer
                            .split(", ")
                            .some((entry) => entry.startsWith(`${order}.`))} // Disable already-selected numbers
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
