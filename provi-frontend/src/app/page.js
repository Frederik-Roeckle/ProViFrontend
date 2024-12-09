"use client";

import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const WelcomeComponent = ({ onStartExperiment }) => {

  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [answers, setAnswers] = useState({});
  const [consentGiven, setConsentGiven] = useState(false);

  const csvData = `
      id,type,question,options
      1,multiple,What gender do you identify yourself with?,"Female;Male;None of the above;Prefer not to answer"
      2,open,How old are you?,
      3,multiple,What is your professional background?,"Researcher;Student (Bachelor/Master);Practitioner"
      4,multiple,How long have you been involved with Process Mining?,"Less than a month;Less than a year;Less than 3 years;3 years or longer"
      5,multiple,How often do you work on Process Mining tasks or with Process Mining tools?,"Daily;Monthly;Less frequent than monthly;Never"
      6,multiple,How would you rate your Process Mining expertise level?,"Novice;Basic;Average;Good;Advanced"
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
          options: question.options
            ? question.options.split(";").map((opt) => opt.trim())
            : [],
        }));
        setQuestions(formattedQuestions);
      }, []);
      
      

  

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


      const handleAnswerChange = (e, questionId) => {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [questionId]: e.target.value,
        }));
      };


  const handleConsentChange = (e) => {
    setConsentGiven(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consentGiven) {
      alert("Please give your consent to proceed.");
      return;
    }
    console.log("Form Data:", formData);
    console.log("Answers:", answers);
    // Proceed to the next step or save the data
  };

  return (
    <div className="bg-gray-50 p-10 shadow-xl rounded-lg h-auto w-3/5 mx-auto flex flex-col gap-10 items-center justify-center">
      <h1 className="text-2xl font-bold">Process Visualization Experiment</h1>
      <p className="text-left text-m">
        Dear Participant, 
        <br />
        <br />
        My name is Marie-Christin Häge, and I am conducting this experiment as
        part of my PhD. The purpose of this study is to investigate Process
        Mining visualizations. Your participation is greatly appreciated and
        will take around 20 minutes to complete.
        <br />
        <br />
        The survey is structured in 4 parts:
        <br />
        1) If you approve with the described procedure, you consent to
        participate in this experiment for the ProVi research project.
        <br />
        2) You will be presented with general questions and questions on Process
        Mining.
        <br />
        3) You will then see an interactive process model visualization where
        you will have to answer some questions about the process shown. You can
        interact with the visualization to get the information you need.
        <br />
        4) Finally, there is a post-experiment question.
        <br />
        <br />
        Please always read the questions and tasks carefully and take the time
        for exploration with the visualization that you need to answer the
        questions.
        <br />
        Please be sure that the data collected from you will only be stored and
        analyzed for the purpose of conducting this experiment and the
        presentation of the results. Only data that is necessary and relevant
        for the evaluation of the study will be asked for.
        <br />
        <br />
        Thank you in advance for your participation and contribution to
        research! <br />
        <br />
        Best, <br />
        Marie-Christin Häge
        <br />
        <br />
      </p>
      <div>
        <h2 className="text-xl font-bold mb-4 color-red">Consent</h2>
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            id="consent"
            checked={consentGiven}
            onChange={handleConsentChange}
            className="w-6 h-6 accent-blue-500"
          />
          <label htmlFor="consent" className="text-lg font-semibold leading-6">
            I have read the general information and the data protection
            information on the ProVi research project and consent to
            participation in the research project and to my data being processed
            within this scope.
          </label>
        </div>
        <br />
        <p className="text-m mt-6">
          I am aware that I give my consent voluntarily and that I can withdraw
          my consent (completely or for individual cases of processing) at any
          time without having to state any reasons, and that withdrawing my
          consent does not have any negative consequences. Withdrawing consent
          does not affect the lawfulness of processing based on consent before
          its withdrawal. I have understood that in order to withdraw my
          consent, I can turn to the person listed as contact in the information
          above and that refusing to give consent or withdrawing consent does
          not have any negative consequences. I was provided with the
          information on the collection of personal data in the research project
          ProVi. The text of this declaration of consent was made available to
          me at www.provi.de where also all the detailed information can be
          found.
        </p>
      </div>
      <br/>
      <div className="flex flex-col gap-6 mt-6">
        <h2 className="text-4xl font-semibold">Pre-Experiment Questions</h2>
        <br/>
        {questions.map((q) => (
          <div key={q.id} className="mb-6">
            <h3 className="font-semibold mb-2">{q.question}</h3>
            {q.type === "multiple" || q.type === "knowledge" ? (
              <div>
                {q.options.map((option, index) => (
                  <label key={index} className="block">
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
                className="border p-2 rounded w-full"
              />
            )}
          </div>
        ))}
      </div>

      <p className="text-lg font-semibold">General Information</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 border rounded-lg w-full"
          />
        </div>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="p-3 border rounded-lg w-full"
        />
        <button
          type="submit"
          disabled={!consentGiven}
          className={`px-6 py-3 rounded-lg mt-4 self-center w-1/2 ${
            consentGiven
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => window.location.href = '/home'}
        >
          Start Experiment
        </button>
      </form>
    </div>
  );
};

export default WelcomeComponent;

