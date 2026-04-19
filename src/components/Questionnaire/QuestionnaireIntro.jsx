import React from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, ArrowRight } from "lucide-react";

const QuestionnaireIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-600/15 border border-red-500/25 flex items-center justify-center mx-auto mb-6">
          <ClipboardList size={28} className="text-red-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-3">Welcome!</h2>
        <p className="text-gray-400 leading-relaxed mb-2">
          You'll now answer a short set of questions to help us understand your motivation,
          computer literacy, and problem-solving skills.
        </p>
        <p className="text-gray-500 text-sm mb-8">It will only take a few minutes. Let's begin!</p>
        <button
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl px-8 py-3 transition-colors"
          onClick={() => navigate("/questionnaire")}
        >
          Start assessment <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default QuestionnaireIntro;
