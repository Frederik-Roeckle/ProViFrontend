"use client";

import React, { useState } from 'react';

const WelcomeComponent = ({ onStartExperiment }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  const [questionnaire, setQuestionnaire] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestionnaire((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onStartExperiment(formData);
  };

  return (
    <div className="bg-gray-50 p-10 shadow-xl rounded-lg h-auto w-3/5 mx-auto flex flex-col gap-10 items-center justify-center">
      <h1 className="text-2xl font-bold">Process Visualization Experiment</h1>
      <p>Willkommen zum process visualization experiment. Bitte löse diesen Test und gebe deinen Namen und deine Email an...</p>

      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold">Pre-Experiment Questions</h2>
        <div className="flex flex-col gap-4">
          <label>
            1. Are you familiar with process visualization tools?
            <div className="flex gap-4 mt-2">
              <input type="radio" name="q1" value="Yes" onChange={handleQuestionChange} /> Yes
              <input type="radio" name="q1" value="No" onChange={handleQuestionChange} /> No
            </div>
          </label>
          <label>
            2. Do you have experience working with flowcharts?
            <div className="flex gap-4 mt-2">
              <input type="radio" name="q2" value="Yes" onChange={handleQuestionChange} /> Yes
              <input type="radio" name="q2" value="No" onChange={handleQuestionChange} /> No
            </div>
          </label>
          <label>
            3. Have you ever participated in an experiment like this before?
            <div className="flex gap-4 mt-2">
              <input type="radio" name="q3" value="Yes" onChange={handleQuestionChange} /> Yes
              <input type="radio" name="q3" value="No" onChange={handleQuestionChange} /> No
            </div>
          </label>
          <label>
            4. How comfortable are you with understanding process flows?
            <div className="flex gap-4 mt-2">
              <input type="radio" name="q4" value="Very Comfortable" onChange={handleQuestionChange} /> Very Comfortable
              <input type="radio" name="q4" value="Somewhat Comfortable" onChange={handleQuestionChange} /> Somewhat Comfortable
              <input type="radio" name="q4" value="Neutral" onChange={handleQuestionChange} /> Neutral
              <input type="radio" name="q4" value="Uncomfortable" onChange={handleQuestionChange} /> Uncomfortable
            </div>
          </label>
        </div>
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
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 self-center w-1/2"
          onClick={() => window.location.href = '/home'}
        >
          Start Experiment
        </button>
      </form>
    </div>
  );
};

export default WelcomeComponent;