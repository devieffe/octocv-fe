import React from 'react';
import { useNavigate } from 'react-router-dom';

const Announce= () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/motivationalsurvey'); // Redirect to the questionnaire
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-blue-950 text-center">Welcome user!</h2>
        <p className="text-center text-gray-700">
          Let's start answering a few questions!
        </p>

        <div className="rounded-lg p-4 shadow space-y-4">
          <button
            className="w-full bg-red-600 text-white py-2 rounded-lg text-lg hover:bg-red-700 transition"
            onClick={handleStartAssessment}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Announce;
