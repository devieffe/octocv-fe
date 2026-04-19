import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const CareerStepCard = ({ step, index, onClick }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: index * 0.1, duration: 0.4 },
        },
      }}
      onClick={onClick}
      className="group bg-white border border-[#e91919]/20 rounded-3xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer p-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-[#e91919]/10 text-[#e91919] p-2 rounded-full">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#e91919] truncate">
            {step.stage_title}
          </h3>
          <span className="text-xs bg-[#e91919]/10 text-[#e91919] px-3 py-1 rounded-full">
            {step.years_from}–{step.years_to} yrs
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
        {step.goal}
      </p>
    </motion.div>
  );
};

export default CareerStepCard;
