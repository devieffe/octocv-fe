import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../../slices/questionnaireSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const MotivationalSurvey = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quizId = "motivationalSurvey";
  
    const quiz = useSelector((state) => state.questionnaire.quizzes[quizId]);
  
    // Remove addQuiz dispatch, as you said you don't use it
  
    const { questions, currentQuestionIndex, completed, answers } = quiz;
    const currentQuestion = questions[currentQuestionIndex];
  
    // Send the answer index, not the label
    const handleAnswerClick = (answerLabel) => {
      const answerIndex = currentQuestion.options.indexOf(answerLabel);
      dispatch(answerQuestion({ quizId, answer: answerIndex }));
    };
  
    const handleContinue = async () => {
      try {
        const response = await axiosInstance.post(
          "/api/submit-motivation-test/",
          {
            responses: answers.map((a) => a.answer), // now numbers
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
  
        console.log("Survey submitted:", response.data);
        navigate("/announce1");
      } catch (error) {
        console.error("Error submitting survey:", error.response?.data || error.message);
      }
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
        <div className="max-w-lg w-full space-y-6">
          {!completed ? (
            <>
              <h2 className="text-3xl font-bold text-blue-950 text-center">
                Question {currentQuestionIndex + 1}:
              </h2>
              <h3 className="text-2xl text-center text-gray-800">{currentQuestion.text}</h3>
  
              <div className="mt-6 space-y-4">
                {currentQuestion.options.map((optionLabel, index) => {
                  const optionText = currentQuestion.optionMap[optionLabel];
                  return (
                    <button
                      key={index}
                      className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg shadow-md hover:bg-gray-300 transition"
                      onClick={() => handleAnswerClick(optionLabel)}
                    >
                      {optionText}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-blue-950 text-center">
                Survey Completed!
              </h2>
              <p className="text-xl text-center text-gray-700">
                Thank you for your responses.
              </p>
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
  

export default MotivationalSurvey;
