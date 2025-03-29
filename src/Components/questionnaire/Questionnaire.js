import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../../slices/questionnaireSlice";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestionIndex, completed } = useSelector(
    (state) => state.questionnaire
  );

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    dispatch(answerQuestion({ answer, questionnaireId: 1 }));
  };

  if (completed) {
    setTimeout(() => {
      navigate("/assessment2"); // Redirect to AssessmentAnnounce2 after a short delay
    }, 1); // Delay of 1 second for smoother transition
  }

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
          {/* <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p> */}
          {/* <button className="btn btn-dark mt-3" onClick={handleResetQuiz}>
            Restart Quiz
          </button> */}
        </>
      )}
    </div>
  );
};

export default Questionnaire;
