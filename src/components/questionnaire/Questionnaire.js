import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion, resetQuiz } from "../../slices/questionnaireSlice";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    questions,
    currentQuestionIndex,
    completed,
    answers,
    readyForNextChapter,
  } = useSelector((state) => state.questionnaire);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    dispatch(answerQuestion({ answer }));
  };

  const handleResetQuiz = () => {
    dispatch(resetQuiz());
  };

  // Redirect if all answers are correct and quiz is completed
  useEffect(() => {
    if (completed && readyForNextChapter) {
      const timeout = setTimeout(() => {
        navigate("/assessment2");
      }, 1000); // 1 second delay

      return () => clearTimeout(timeout); // Cleanup
    }
  }, [completed, readyForNextChapter, navigate]);

  // Calculate score (for showing on failure)
  const score = answers.filter((a) => a.isCorrect).length;

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
      ) : !readyForNextChapter ? (
        <>
          <p>Your Score: {score} / {questions.length}</p>
          <button className="btn btn-dark mt-3" onClick={handleResetQuiz}>
            Restart Quiz
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Questionnaire;
