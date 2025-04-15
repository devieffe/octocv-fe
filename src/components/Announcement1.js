import React from 'react';
import { useNavigate } from 'react-router-dom';

const Announcement1 = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/questionnaire'); // Redirect to the questionnaire
  };

  return (
    <div className='container text-center'>
      <h2>Welcome User!</h2>
      <p>
        Now let’s make an assessment to test your cognitive ability as well as your computer literacy skills.
      </p>
      <button className="btn btn-dark" onClick={handleStartAssessment}>
        Start test
      </button>
    </div>
  );
};

export default Announcement1;
