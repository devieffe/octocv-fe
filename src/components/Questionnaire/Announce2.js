import React from 'react';
import { useNavigate } from 'react-router-dom';

const Announce2 = () => {
  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate('/questionnaire2'); // Redirect to the next part of the questionnaire
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-blue-950 text-center">Congratulations</h2>
        <p className="text-center text-gray-700">The first part of the assessment is completed!</p>

        <div className="rounded-lg p-4 shadow space-y-4">
          <p className="text-center text-gray-700 font-semibold">
            The following questions are designed to test your problem-solving skills.
          </p>
          <p className="text-center text-gray-700">Take your time to answer each question to the best of your ability.</p>

          <button
            className="w-full bg-red-600 text-white py-2 rounded-lg text-lg hover:bg-red-700 transition"
            onClick={handleContinueClick}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Announce2;
