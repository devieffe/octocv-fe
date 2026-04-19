import React, { useState } from "react";
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
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.status === 200) { setSubmitted(true); if (onComplete) onComplete(); }
    } catch (err) {
      console.error("Submit error:", err);
      if (err.response?.status === 403) { setError("You have already completed this test."); setSubmitted(true); }
      else if (err.response?.status === 400) { setError("Validation error: " + err.response.data.error); }
      else { setError("Unexpected error occurred."); }
    }
  };

  if (!quiz || !questions) {
    return <div className="text-gray-400 text-sm">Loading problem-solving test...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full max-w-lg bg-slate-900 border border-white/5 rounded-2xl p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1">Problem Solving Test</p>
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
              {currentQuestion.options.map((optionLabel, index) => {
                const optionText = currentQuestion.optionMap[optionLabel];
                const isSelected = answers[currentQuestionIndex] === optionLabel.toUpperCase();
                return (
                  <motion.button key={index} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswerClick(optionLabel)}
                    className={`w-full py-3 px-5 rounded-xl border text-sm font-medium transition text-left ${
                      isSelected
                        ? "bg-red-500/15 border-red-500/30 text-red-300"
                        : "border-white/10 text-gray-300 hover:border-red-500/25 hover:bg-white/3 hover:text-white bg-transparent"
                    }`}
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
            <h2 className="text-lg font-bold text-white">Test complete!</h2>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {!submitted && (
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

export default ProblemSolvingTest;
