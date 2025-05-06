import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../../slices/questionnaireSlice";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const quizId = "quiz1";
  const quiz = useSelector((state) => state.questionnaire.quizzes[quizId]);

  if (!quiz) {
    return <div className="text-center text-gray-700">Loading...</div>; 
  }

  const { questions, currentQuestionIndex, completed, answers } = quiz;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    dispatch(answerQuestion({ quizId, answer }));
  };

  const score = answers.reduce((acc, answer, index) => {
    if (answer === questions[index].correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const handleContinue = () => {
    navigate('/announce2');
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
            <p className="text-xl text-center text-gray-700">Your Score: {score} / {questions.length}</p>
            <button
              className="w-full bg-red-600 text-white py-2 rounded-lg text-lg hover:bg-red-700 transition mt-4"
              onClick={handleContinue}
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
