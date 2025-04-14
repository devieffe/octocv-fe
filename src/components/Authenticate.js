import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Authenticate = () => {
  const navigate = useNavigate(); // Move hook to top level

  const handleStartAssessment = () => {
    navigate('/login'); // Use the navigate function
  };

  return (
    <div className='container text-center'>
      <h2>Please authenticate</h2>
      <p>
        <Link to="/login">Sign in</Link> to OctoCV.
      </p>
      <button className="btn btn-dark" onClick={handleStartAssessment}>
        OK
      </button>
    </div>
  );
};

export default Authenticate;
