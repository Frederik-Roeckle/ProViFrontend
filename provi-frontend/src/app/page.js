"use client";

import React, { useState } from "react";
import Link from "next/link";
import AlertPopup from '../components/Questionnaire/AlertPopup';
import ScrollProgressBar from "../components/WelcomePage/ScrollProgressBar";

import "@coreui/coreui/dist/css/coreui.min.css";

export default function WelcomeComponent() {

  const [consentGiven, setConsentGiven] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [alertMessage, setAlertMessage] = useState(""); // sets alertMessage


      const handleConsentChange = (e) => {
        setConsentGiven(e.target.checked);
      };

      const handleSubmit = (e) => {
      
        if (!consentGiven) {
          setAlertMessage("Please give your consent to proceed.");
          setShowModal(true);
          return;
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

      <p className="text-left text-xl">
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
        <h2 className="text-3xl font-bold mb-4 color-red">Consent</h2>
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            id="consent"
            onChange={handleConsentChange}
            className="w-6 h-6 accent-blue-500"
          />
          <label htmlFor="consent" className="text-2xl font-semibold leading-6">
            I have read the general information and the data protection
            information on the ProVi research project and consent to
            participation in the research project and to my data being processed
            within this scope.
          </label>
        </div>
        <br />
        <p className="text-xl mt-6">
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
      <Link href={consentGiven ? "/prequestionnaire" : "#"} passHref>
        <button
          type="submit"
          onClick={!consentGiven ? handleSubmit : null}
          className="px-10 py-3 rounded-lg mt-4 self-center bg-blue-500 text-white hover:bg-blue-600"
        >
          Enter Pre-Questions
        </button>
      </Link>
      <br/>
    </div>
  );
};


