import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalCard = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

const CareerModal = ({ step, onClose }) => {
  return (
    <AnimatePresence>
      {step && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={modalCard}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#e91919]">{step.stage_title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-64px)]">
              <p className="text-gray-800 mb-4">
                <strong>Goal:</strong> {step.goal}
              </p>

              <InfoList title="Skills" items={step.skills} />
              <InfoList title="Capabilities" items={step.capabilities} />
              <InfoList title="Job Titles" items={step.job_titles} />
              <InfoList title="Learning Paths" items={step.learning_paths} />
              <InfoList title="Recommended Projects" items={step.recommended_projects} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InfoList = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-600 mb-2 bg-gray-100 rounded px-2 py-1 inline-block">
        {title}
      </h4>
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CareerModal;
