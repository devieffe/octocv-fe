import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Authenticate = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-blue-950">Please Authenticate</h2>
        <p className="text-gray-700">
          <Link to="/login" className="text-red-600 underline hover:text-red-700 transition">
            Sign in
          </Link>{' '}
          to access Octo<span className="text-red-600 font-semibold">CV</span>.
        </p>
        <button
          onClick={handleStartAssessment}
          className="mt-6 w-full px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Authenticate;
