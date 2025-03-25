import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssessmentAnnounce2 = () => {
  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate('/questionnaire2');
  }

  return (
    <div className='container text-center'>
      <h2>Congratulations</h2>
      <p>The first part of the assessment is completed!</p>
      <p className='fw-bold'>
        The following questions are designed to test your problem-solving skills
      </p>
      <p>Take your time to answer each question to the best of your ability.</p>
      <button className="btn btn-dark" onClick={handleContinueClick}>Continue</button>
    </div>
  );
};

export default AssessmentAnnounce2;
