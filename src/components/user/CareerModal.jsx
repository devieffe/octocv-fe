import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Sparkles } from "lucide-react";

const StatCard = ({ title, items, iconColor }) => (
  items?.length > 0 && (
    <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
      <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">{title}</h4>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
            <CheckCircle size={13} className={`${iconColor} mt-0.5 shrink-0`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
);

const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const modalCard = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, scale: 0.95, y: 16, transition: { duration: 0.18 } },
};

const CareerModal = ({ step, onClose }) => (
  <AnimatePresence>
    {step && (
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4"
        variants={backdrop} initial="hidden" animate="visible" exit="hidden"
        aria-modal="true" role="dialog" onClick={onClose}
      >
        <motion.div
          variants={modalCard} initial="hidden" animate="visible" exit="exit"
          className="relative bg-slate-900 border border-white/8 w-full max-w-2xl max-h-[88vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-red-400" />
              <h2 className="text-base font-bold text-white truncate">{step.stage_title}</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition rounded-lg p-1" aria-label="Close">
              <X size={20} />
            </button>
          </header>

          {/* Content */}
          <main className="px-6 py-6 overflow-y-auto space-y-6 flex-1 text-sm">
            {/* Goal */}
            <div className="bg-red-500/8 border border-red-500/15 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wide">🎯 Mission Goal</h3>
              <p className="text-gray-300 leading-relaxed">{step.goal}</p>
            </div>

            {/* Skills */}
            {step.skills?.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">🛠 Skills to Master</h4>
                <div className="flex flex-wrap gap-2">
                  {step.skills.map((skill, i) => (
                    <span key={i} className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid sm:grid-cols-2 gap-4">
              <StatCard title="Capabilities" items={step.capabilities} iconColor="text-red-400" />
              <StatCard title="Job Titles" items={step.job_titles} iconColor="text-red-400" />
            </div>

            {/* Learning */}
            {step.learning_paths?.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">📘 Learning Paths</h4>
                <ul className="space-y-1.5">
                  {step.learning_paths.map((path, i) => (
                    <li key={i} className="text-gray-300 text-sm">• {path}</li>
                  ))}
                </ul>
              </div>
            )}
          </main>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default CareerModal;
