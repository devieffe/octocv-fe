import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const CareerStepCard = ({ step, index, onClick }) => (
  <motion.div
    custom={index}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.35 }}
    onClick={onClick}
    className="group bg-slate-900 border border-white/5 hover:border-red-500/20 rounded-2xl p-6 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/5"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
        <Briefcase className="w-4 h-4 text-red-400" />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-white truncate">{step.stage_title}</h3>
        <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full">
          {step.years_from}–{step.years_to} yrs
        </span>
      </div>
    </div>
    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{step.goal}</p>
  </motion.div>
);

export default CareerStepCard;
