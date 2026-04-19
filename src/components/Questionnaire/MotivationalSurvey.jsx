import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../../slices/questionnaireSlice";
import axiosInstance from "../../api/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
  transition: { duration: 0.3 },
};

const MotivationalSurvey = ({ onComplete }) => {
  const dispatch = useDispatch();
  const quizId = "motivationalSurvey";
  const quiz = useSelector((state) => state.questionnaire.quizzes[quizId]);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="text-gray-400 text-sm">Loading motivational survey...</div>
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
      await axiosInstance.post(
        "/api/submit-motivation-test/",
        { responses: answers.map((a) => a.answer) },
        { headers: { "Content-Type": "application/json" } }
      );
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Error submitting survey:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full max-w-lg bg-slate-900 border border-white/5 rounded-2xl p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1">Motivational Survey</p>
        {!completed && (
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">{currentQuestionIndex + 1}/{questions.length}</span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!completed && currentQuestion ? (
          <motion.div key={currentQuestionIndex} {...fadeIn} className="space-y-5">
            <p className="text-base font-semibold text-white leading-relaxed">{currentQuestion.text}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((optionLabel, index) => {
                const optionText = currentQuestion.optionMap[optionLabel];
                return (
                  <motion.button
                    key={index} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswerClick(optionLabel)}
                    className="w-full py-3 px-5 rounded-xl border text-sm font-medium transition text-left border-white/10 text-gray-300 hover:border-red-500/25 hover:bg-white/3 hover:text-white bg-transparent"
                  >
                    {optionText}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div key="completed" {...fadeIn} className="space-y-5 text-center">
            <CheckCircle size={40} className="text-green-400 mx-auto" />
            <h2 className="text-lg font-bold text-white">Survey complete!</h2>
            <p className="text-gray-400 text-sm">Thank you for completing the motivational survey.</p>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleSubmitSurvey}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors"
            >
              Submit & Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MotivationalSurvey;
