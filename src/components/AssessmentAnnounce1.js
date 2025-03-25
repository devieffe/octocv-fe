import React from "react";
import { useNavigate } from "react-router-dom";

const AssessmentAnnounce = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/questionnaire"); // Navigate to the questionnaire page
  };

  return (
    <>
      <div className="container text-center col-6 custom-container">
        <h2>The following questions are designed to assess your Computer Literacy skills</h2>
        <p>Take your time to answer each question to the best of your ability.</p>
        <button className="btn btn-dark" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </>
  );
};

export default AssessmentAnnounce;
