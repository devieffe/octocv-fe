import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../../slices/questionnaireSlice";
import axiosInstance from "../../api/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.4 },
};

const ProblemSolvingTest = ({ onComplete }) => {
  const dispatch = useDispatch();
  const quizId = "problemsolvingtest";

  const quiz = useSelector((state) => state.questionnaire.quizzes[quizId]);
  const { questions, currentQuestionIndex, completed } = quiz || {};

  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleAnswerClick = (optionLabel) => {
    dispatch(answerQuestion({ quizId, answer: optionLabel }));

    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] = optionLabel.toUpperCase();
      return updated;
    });
  };

  const submitAnswers = async () => {
    if (submitted || !completed) return;

    try {
      const accessToken = localStorage.getItem("access_token");
      const res = await axiosInstance.post(
        "/api/submit-logic-test/",
        { responses: answers },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        console.log("Submitted successfully");
        setSubmitted(true);
        if (onComplete) onComplete();
      }
    } catch (err) {
      console.error("Submit error:", err);
      if (err.response?.status === 403) {
        setError("You have already completed this test.");
        setSubmitted(true);
      } else if (err.response?.status === 400) {
        setError("Validation error: " + err.response.data.error);
      } else {
        setError("Unexpected error occurred.");
      }
    }
  };

  if (!quiz || !questions) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading problem-solving test...
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl border border-gray-200 rounded-2xl p-8 shadow-md bg-white">
        <AnimatePresence mode="wait">
          {!completed && currentQuestion ? (
            <motion.div
              key={currentQuestionIndex}
              {...fadeIn}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                <p className="text-lg text-gray-700 font-medium">
                  {currentQuestion.text}
                </p>
              </div>

              <div className="space-y-4">
                {currentQuestion.options.map((optionLabel, index) => {
                  const optionText = currentQuestion.optionMap[optionLabel];
                  const isSelected =
                    answers[currentQuestionIndex] === optionLabel.toUpperCase();

                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerClick(optionLabel)}
                      className={`w-full py-3 px-5 border rounded-lg transition text-base font-medium shadow-sm
                        ${
                          isSelected
                            ? "bg-red-100 border-red-500 text-red-700 font-semibold"
                            : "bg-white hover:border-[#e91919] hover:text-[#e91919] border-gray-300 text-gray-800"
                        }`}
                    >
                      {optionText}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              {...fadeIn}
              className="space-y-6 text-center"
            >
              <h2 className="text-xl font-semibold text-[#e91919]">
                Thank you for completing the problem-solving test!
              </h2>

              {error && <p className="text-red-500 text-base">{error}</p>}

              {!submitted && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitAnswers}
                  className="w-full bg-[#e91919] text-white py-3 rounded-lg hover:bg-red-700 transition text-base font-medium"
                >
                  Submit & Continue
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProblemSolvingTest;