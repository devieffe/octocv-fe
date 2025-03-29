import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../slices/questionnaireSlice";
import { useNavigate } from "react-router-dom";

const Questionnaire2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const { questions, currentQuestionIndex, completed } = useSelector(
    (state) => state.questionnaire.questionnaire2
  );

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    dispatch(answerQuestion({ answer, questionnaireId: 2 }));
  };

  // test
  return (
    <div className="container text-center col-6 custom-container">
      {!completed ? (
        <>
          <h2>Question {currentQuestionIndex + 1}:</h2>
          <h3>{currentQuestion.text}</h3>

          <div className="options mt-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="btn btn-outline-dark m-2"
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Quiz Completed!</h2>
          {/* <p>Your Score: {score} / {questions.length}</p> */}
          <button
            className="btn btn-dark mt-3"
            onClick={() => navigate("/dashboarduser")}
          >
            Go to Dashboard
          </button>
        </>
      )}
    </div>
  );
};

export default Questionnaire2;
