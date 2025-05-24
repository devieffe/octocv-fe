import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionnaireIntro = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/questionnaire'); // Starts the questionnaire flow
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-blue-950 text-center">Welcome!</h2>
        <p className="text-center text-gray-700">
          You'll now answer a short set of questions to help us understand your motivation,
          computer literacy, and problem-solving skills.
        </p>
        <p className="text-center text-gray-700">
          It will only take a few minutes. Let’s begin!
        </p>
        <button
          className="w-full bg-red-600 text-white py-2 rounded-lg text-lg hover:bg-red-700 transition"
          onClick={handleStart}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default QuestionnaireIntro;
