import React, { useState, useCallback } from "react";
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

const ComputerLiteracyTest = ({ onComplete }) => {
  const dispatch = useDispatch();
  const quizId = "computerliteracytest";
  const quiz = useSelector((state) => state.questionnaire.quizzes[quizId]);
  const [submitted, setSubmitted] = useState(false);

  const submitAnswers = useCallback(async () => {
    if (!quiz || submitted || !quiz.answers || quiz.answers.length === 0) return;
    const formattedAnswers = quiz.answers.map((a, i) => {
      const question = quiz.questions[i];
      return question.options[a.answer];
    });
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axiosInstance.post(
        "/api/submit-literacy-test/",
        { responses: formattedAnswers },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response.status === 200) { setSubmitted(true); if (onComplete) onComplete(); }
    } catch (error) {
      console.error("Submission error:", error);
      if (error.response?.status === 403) { alert("You have already taken this test."); setSubmitted(true); }
    }
  }, [quiz, submitted, onComplete]);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div className="text-gray-400 text-sm">Loading computer literacy test...</div>;
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
    <div className="w-full max-w-lg bg-slate-900 border border-white/5 rounded-2xl p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1">Computer Literacy Test</p>
        {!completed && (
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }} />
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
              {currentQuestion.options.map((key, index) => {
                const isSelected = quiz.answers[currentQuestionIndex]?.answer === currentQuestion.options.indexOf(key);
                return (
                  <motion.button key={index} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswerClick(key)}
                    className={`w-full py-3 px-5 rounded-xl border text-sm font-medium transition text-left ${
                      isSelected
                        ? "bg-red-500/15 border-red-500/30 text-red-300"
                        : "border-white/10 text-gray-300 hover:border-red-500/25 hover:bg-white/3 hover:text-white bg-transparent"
                    }`}
                  >
                    {currentQuestion.optionMap[key]}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div key="completed" {...fadeIn} className="space-y-5 text-center">
            <CheckCircle size={40} className="text-green-400 mx-auto" />
            <h2 className="text-lg font-bold text-white">Test complete!</h2>
            {submitted ? (
              <p className="text-gray-400 text-sm">Your answers have been submitted successfully.</p>
            ) : (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={submitAnswers}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors">
                Submit & Continue
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComputerLiteracyTest;
