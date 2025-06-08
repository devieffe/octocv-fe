import { motion } from "framer-motion";
import { Briefcase } from "lucide-react"; // Optional icon

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
      className="group bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer p-5"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-red-100 text-red-600 p-2 rounded-full">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{step.stage_title}</h3>
          <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
            {step.years_from}–{step.years_to} yrs
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-3">{step.goal}</p>
    </motion.div>
  );
};

export default CareerStepCard;
