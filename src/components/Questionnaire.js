import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion, resetQuiz } from "../slices/questionnaireSlice";

const Questionnaire = () => {
  const dispatch = useDispatch();

  const [currentQuizId, setCurrentQuizId] = useState("quiz1");
  const [started, setStarted] = useState(false);

  const quizState = useSelector((state) => state.questionnaire.quizzes[currentQuizId]);

  useEffect(() => {
    if (currentQuizId === "quiz2" && !quizState?.questions?.length) {
      dispatch(resetQuiz({ quizId: "quiz2" })); // Load/reset quiz2 when it's started
    }
  }, [currentQuizId, dispatch, quizState]);

  if (!quizState) return <p>Loading quiz...</p>;

  const {
    questions,
    currentQuestionIndex,
    completed,
    answers,
    readyForNextChapter,
  } = quizState;

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    dispatch(answerQuestion({ quizId: currentQuizId, answer }));
  };

  const handleResetQuiz = () => {
    dispatch(resetQuiz({ quizId: currentQuizId }));
    setStarted(false);
  };

  const handleStartAssessment = () => {
    if (currentQuizId === "quiz2") {
      dispatch(resetQuiz({ quizId: "quiz2" }));
    }
    setStarted(true);
  };

  const handleContinueToQuiz2 = () => {
    setCurrentQuizId("quiz2");
    setStarted(false); // Show announcement for quiz2
  };

  const score = answers.filter((a) => a.isCorrect).length;

  // Announcement screen before quiz starts
  if (!started) {
    return (
      <div className='container text-center'>
        {currentQuizId === "quiz1" ? (
          <>
            <h2>Welcome User!</h2>
            <p>
              Let’s test your cognitive ability as well as your computer literacy skills.
            </p>
            <button className="btn btn-dark" onClick={handleStartAssessment}>
              OK
            </button>
          </>
        ) : (
          <>
            <h2>Congratulations</h2>
            <p>The First part is completed!</p>
            <p className='fw-bold'>
              The following questions are designed to test your problem-solving skills.
            </p>
            <p>Please answer each question to the best of your ability.</p>
            <button className="btn btn-dark" onClick={handleStartAssessment}>
              Continue
            </button>
          </>
        )}
      </div>
    );
  }

  // Quiz content
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
      ) : currentQuizId === "quiz1" ? (
        <div className="mt-4">
          <p>You've successfully completed Part 1!</p>
          <button className="btn btn-dark" onClick={handleContinueToQuiz2}>
            Continue to Part 2
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <h4>Assessment Complete!</h4>
          <p>Your final score: {score} / {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
