import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Sparkles } from "lucide-react";

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
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          aria-modal="true"
          role="dialog"
          aria-labelledby="career-modal-title"
        >
          <motion.div
            variants={modalCard}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-[28px] shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white border-b px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="text-[#e91919]" size={24} />
                <h2
                  id="career-modal-title"
                  className="text-xl font-semibold text-gray-900 truncate max-w-[80vw]"
                >
                  {step.stage_title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </header>

            {/* Content */}
            <main className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-64px)] text-sm text-gray-800 space-y-8 flex-1">
              {/* Goal Overview */}
              <section
                className="bg-red-50 border border-red-200 rounded-3xl p-5 shadow-sm"
                aria-label="Mission goal"
              >
                <h3 className="text-base font-semibold text-red-700 mb-2 flex items-center gap-2">
                  🎯 Mission Goal
                </h3>
                <p className="leading-relaxed">{step.goal}</p>
              </section>

              {/* Skills Tags */}
              {step.skills?.length > 0 && (
                <section aria-label="Skills to master">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 tracking-wide uppercase">
                    🛠 Skills to Master
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {step.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-red-100 text-red-700 text-xs font-semibold px-4 py-1 rounded-full border border-red-200 shadow-sm select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Stats Panels */}
              <section className="grid sm:grid-cols-2 gap-6" aria-label="Capabilities and job titles">
                <StatCard title="Capabilities" items={step.capabilities} iconColor="text-red-600" />
                <StatCard title="Job Titles" items={step.job_titles} iconColor="text-red-600" />
              </section>

              {/* Learning Paths */}
              {step.learning_paths?.length > 0 && (
                <section aria-label="Suggested learning paths">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 tracking-wide uppercase">
                    📘 Suggested Learning Paths
                  </h4>
                  <ul className="space-y-2 list-disc list-inside text-gray-700">
                    {step.learning_paths.map((path, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm leading-snug">
                        <CheckCircle className="text-green-500 w-4 h-4 flex-shrink-0" />
                        <span>{path}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Recommended Projects */}
              {step.recommended_projects?.length > 0 && (
                <section aria-label="Recommended projects">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 tracking-wide uppercase">
                    🚀 Recommended Projects
                  </h4>
                  <ul className="space-y-2">
                    {step.recommended_projects.map((proj, i) => (
                      <li
                        key={i}
                        className="text-gray-700 bg-gray-50 border border-gray-100 px-5 py-3 rounded-3xl shadow-sm hover:shadow-md transition select-none cursor-default"
                      >
                        {proj}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </main>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StatCard = ({ title, items, iconColor = "text-gray-600" }) => {
  if (!items || items.length === 0) return null;
  return (
    <section className="bg-gray-50 border border-gray-200 rounded-3xl p-5 shadow-sm select-none">
      <h4 className="text-sm font-semibold text-gray-700 mb-3 tracking-wide uppercase">{title}</h4>
      <ul className="space-y-1 text-gray-800 text-sm list-disc list-inside">
        {items.map((item, i) => (
          <li key={i} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default CareerModal;
