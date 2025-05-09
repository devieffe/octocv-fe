import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../../slices/questionnaireSlice";
import { useNavigate } from "react-router-dom";

const Questionnaire2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  // Get the data for quiz2 from Redux
  const quizId = "quiz2"; // Adjust quiz ID as needed
  const quiz2 = useSelector((state) => state.questionnaire.quizzes[quizId]);

  // Ensure quiz data is available and loaded
  if (!quiz2 || !quiz2.questions) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  const { questions, currentQuestionIndex, completed } = quiz2;
  const currentQuestion = questions[currentQuestionIndex];

  // Check if the current question exists and has a correctAnswer
  const correctAnswer = currentQuestion?.correctAnswer;

  const handleAnswerClick = (answer) => {
    if (correctAnswer !== undefined) {
      dispatch(answerQuestion({ answer, quizId })); // Dispatch the answer for quiz2
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="max-w-lg w-full space-y-6">
        {!completed ? (
          <>
            <h2 className="text-3xl font-bold text-blue-950 text-center">Question {currentQuestionIndex + 1}:</h2>
            <h3 className="text-2xl text-center text-gray-800">{currentQuestion.text}</h3>

            <div className="mt-6 space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg shadow-md hover:bg-gray-300 transition"
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-blue-950 text-center">Quiz Completed!</h2>
            <button
              className="w-full bg-red-600 text-white py-2 rounded-lg text-lg hover:bg-red-700 transition mt-4"
              onClick={() => navigate('/user')}
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Questionnaire2;
