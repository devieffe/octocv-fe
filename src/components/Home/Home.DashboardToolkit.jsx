import React from "react";
import { motion } from "framer-motion";
import { Brain, Map, FileText } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const DASHBOARD_FEATURES = [
  { icon: Brain, title: "Assessment status", text: "Track motivation, literacy, and problem-solving completion from onboarding." },
  { icon: Map, title: "Career stages", text: "Move through the goals and skills connected to your selected career path." },
  { icon: FileText, title: "CV workspace", text: "Upload your existing CV and download the generated DOCX from the builder." },
];

const DashboardToolkit = () => (
  <section id="assessments" aria-labelledby="assessments-heading" className="py-24 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3" aria-hidden="true">
          Inside your dashboard
        </motion.p>
        <motion.h2 id="assessments-heading" variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
          Turn your answers into <span className="text-red-500">action</span>
        </motion.h2>
      </motion.div>

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6 list-none m-0 p-0"
        role="list"
      >
        {DASHBOARD_FEATURES.map(({ icon: Icon, title, text }) => (
          <motion.li
            key={title}
            variants={fadeUp}
            className="p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-white/10 transition-colors flex flex-col gap-4 tv-noise"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Icon size={20} className="text-red-400" aria-hidden="true" />
            </div>
            <h3 className="text-white font-semibold text-lg">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed flex-1">{text}</p>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </section>
);

export default DashboardToolkit;
