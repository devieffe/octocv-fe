import React from "react";
import { motion } from "framer-motion";
import { FileText, Monitor, Map } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const FEATURES = [
  { icon: FileText, title: "AI CV updater", desc: "Upload your CV, choose a career path and language, then generate an enhanced downloadable CV in PDF or DOC." },
  { icon: Monitor, title: "Three assessments", desc: "Complete the motivation, computer literacy, and problem-solving tests to unlock the career tools in your dashboard." },
  { icon: Map, title: "Career path map", desc: "Choose a career path and receive a staged roadmap with goals, skills, capabilities, and learning paths." },
];

const Features = () => (
  <section id="features" aria-labelledby="features-heading" className="py-24 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3" aria-hidden="true">
          Platform Features
        </motion.p>
        <motion.h2 id="features-heading" variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
          A practical toolkit for <br />
          <span className="text-red-500">your next job</span>
        </motion.h2>
      </motion.div>

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none m-0 p-0"
        role="list"
      >
        {FEATURES.map(({ icon: Icon, title, desc }, index) => {
          const isMiddle = index === 1;

          return (
            <motion.li
              key={title}
              variants={fadeUp}
              className="group text-left p-6 rounded-2xl bg-slate-900 transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                <div aria-hidden="true" className={isMiddle ? "feature-icon-shell feature-icon-shell--middle relative inline-flex" : "feature-icon-shell relative inline-flex"}>
                  <div className="step-icon-pattern w-16 h-16 rounded-2xl bg-white flex items-center justify-center relative">
                    <Icon size={48} className="text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 text-left">{title}</h3>
              <p className="text-gray-400 leading-relaxed text-left">{desc}</p>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  </section>
);

export default Features;
