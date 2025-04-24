import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion, resetQuiz } from "../slices/questionnaireSlice";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentQuizId, setCurrentQuizId] = useState("quiz1");
  const [started, setStarted] = useState(false);

  const quizState = useSelector((state) => state.questionnaire.quizzes[currentQuizId]);

  useEffect(() => {
    if (currentQuizId === "quiz2" && !quizState?.questions?.length) {
      dispatch(resetQuiz({ quizId: "quiz2" }));
    }
  }, [currentQuizId, dispatch, quizState]);

  if (!quizState) return <p className="text-center mt-10 text-blue-950">Loading quiz...</p>;

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
    setStarted(false);
  };

  const handleCreateCV = () => {
    navigate("/make");
  };

  const score = answers.filter((a) => a.isCorrect).length;

  // Start screen
  if (!started) {
    return (
      <div className="max-w-xl mx-auto text-center px-4 py-16">
        {currentQuizId === "quiz1" ? (
          <>
            <h2 className="text-3xl font-semibold text-blue-950 mb-4">Welcome!</h2>
            <p className="text-gray-700 mb-6">
              Let’s test your cognitive ability and computer literacy skills.
            </p>
            <button
              onClick={handleStartAssessment}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Start Assessment
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-blue-950 mb-4">Congratulations!</h2>
            <p className="text-gray-700 mb-2">You’ve completed the first part.</p>
            <p className="text-red-600 font-semibold">
              Now let's test your problem-solving skills.
            </p>
            <p className="text-gray-600 mt-2">Answer carefully and do your best.</p>
            <button
              onClick={handleStartAssessment}
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Continue
            </button>
          </>
        )}
      </div>
    );
  }

  // Main quiz
  return (
    <div className="max-w-2xl mx-auto text-center px-4 py-16">
      {!completed ? (
        <>
          <h2 className="text-xl font-semibold text-blue-950 mb-4">
            Question {currentQuestionIndex + 1}
          </h2>
          <h3 className="text-lg text-gray-800 mb-6">{currentQuestion.text}</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-red-50 hover:text-red-600 transition text-blue-950"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : !readyForNextChapter ? (
        <>
          <h3 className="text-lg text-gray-800 mb-4">
            Your Score: <span className="text-red-600">{score} / {questions.length}</span>
          </h3>
          <button
            onClick={handleResetQuiz}
            className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          >
            Restart Quiz
          </button>
        </>
      ) : currentQuizId === "quiz1" ? (
        <div className="mt-6">
          <p className="text-gray-800">You've successfully completed Part 1!</p>
          <button
            onClick={handleContinueToQuiz2}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Continue to Part 2
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <h4 className="text-xl font-semibold text-blue-950 mb-2">Assessment Complete!</h4>
          <p className="text-gray-800 mb-4">Your final score: <span className="text-red-600">{score} / {questions.length}</span></p>
          <button
            onClick={handleCreateCV}
            className="px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition"
          >
            Create CV
          </button>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
