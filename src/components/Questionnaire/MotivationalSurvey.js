import React from "react";
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

const MotivationalSurvey = ({ onComplete }) => {
  const dispatch = useDispatch();
  const quizId = "motivationalSurvey";

  const quiz = useSelector((state) => state.questionnaire.quizzes[quizId]);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading motivational survey...
      </div>
    );
  }

  const { questions, currentQuestionIndex, completed, answers } = quiz;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answerLabel) => {
    if (!completed) {
      const answerIndex = currentQuestion.options.indexOf(answerLabel);
      dispatch(answerQuestion({ quizId, answer: answerIndex }));
    }
  };

  const handleSubmitSurvey = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/submit-motivation-test/",
        {
          responses: answers.map((a) => a.answer),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Survey submitted:", response.data);
      if (onComplete) onComplete();
    } catch (error) {
      console.error(
        "Error submitting survey:",
        error.response?.data || error.message
      );
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
                {currentQuestion.options.map((optionLabel, index) => {
                  const optionText = currentQuestion.optionMap[optionLabel];
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerClick(optionLabel)}
                      className="w-full py-3 px-5 border border-gray-300 rounded-lg bg-white hover:border-[#e91919] hover:text-[#e91919] transition text-gray-800 text-base font-medium shadow-sm"
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
                Thank you for completing the motivational survey!
              </h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitSurvey}
                className="w-full bg-[#e91919] text-white py-3 rounded-lg hover:bg-red-700 transition text-base font-medium"
              >
                Submit & Continue
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MotivationalSurvey;