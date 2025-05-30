import React, { useState, useCallback } from "react";
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

const ComputerLiteracyTest = ({ onComplete }) => {
  const dispatch = useDispatch();
  const quizId = "computerliteracytest";
  const quiz = useSelector((state) => state.questionnaire.quizzes[quizId]);

  const [submitted, setSubmitted] = useState(false);

  const submitAnswers = useCallback(async () => {
    if (!quiz || submitted || !quiz.answers || quiz.answers.length === 0) return;

    const formattedAnswers = quiz.answers.map((a, i) => {
      const question = quiz.questions[i];
      return question.options[a.answer]; // "A", "B", etc.
    });

    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axiosInstance.post(
        "/api/submit-literacy-test/",
        { responses: formattedAnswers },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === 200) {
        setSubmitted(true);
        console.log("Submitted:", response.data.message);
        if (onComplete) onComplete();
      }
    } catch (error) {
      console.error("Submission error:", error);
      if (error.response?.status === 403) {
        alert("You have already taken this test.");
        setSubmitted(true);
      }
    }
  }, [quiz, submitted, onComplete]);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading computer literacy test...
      </div>
    );
  }

  const { questions, currentQuestionIndex, completed } = quiz;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (optionKey) => {
    if (!completed && currentQuestion) {
      const answerIndex = currentQuestion.options.indexOf(optionKey);
      dispatch(answerQuestion({ quizId, answer: answerIndex }));
    }
  };

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
                {currentQuestion.options.map((key, index) => {
                  const isSelected =
                    quiz.answers[currentQuestionIndex]?.answer ===
                    currentQuestion.options.indexOf(key);

                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerClick(key)}
                      className={`w-full py-3 px-5 border rounded-lg text-base font-medium shadow-sm transition ${
                        isSelected
                          ? "bg-red-100 border-[#e91919] text-[#e91919] font-semibold"
                          : "bg-white border-gray-300 text-gray-800 hover:border-[#e91919] hover:text-[#e91919]"
                      }`}
                    >
                      {currentQuestion.optionMap[key]}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div key="completed" {...fadeIn} className="space-y-6 text-center">
              <h2 className="text-xl font-semibold text-[#e91919]">
                You’ve completed the Computer Literacy Test!
              </h2>
              {submitted ? (
                <p className="text-gray-600 text-base">
                  Your answers have been submitted successfully.
                </p>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitAnswers}
                  className="w-full bg-[#e91919] text-white py-3 rounded-lg hover:bg-red-700 transition text-base font-medium"
                >
                  Submit & Finish
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ComputerLiteracyTest;