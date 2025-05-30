import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const CareerStepCard = ({ step, index }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-4 transition hover:shadow-lg"
    >
      <h3 className="text-xl font-semibold text-[#e91919] flex items-center gap-2">
        <Briefcase className="w-5 h-5" />
        {step.title}
      </h3>
      <div className="text-gray-700 space-y-2 text-sm leading-relaxed">
        <p><span className="font-medium">Description:</span> {step.description}</p>
        <p><span className="font-medium">Skills:</span> {step.skills}</p>
        <p><span className="font-medium">Experience:</span> {step.experience}</p>
        <p><span className="font-medium">Expected Salary:</span> {step.salary}</p>
      </div>
    </motion.div>
  );
};

export default CareerStepCard;