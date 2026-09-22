import React from "react";
import { motion } from "framer-motion";
import { User, BookOpen, Download } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const STEPS = [
  { num: "01", icon: User, title: "Create and verify your account", desc: "Register with your real name, username, email, and password, then confirm your email address." },
  { num: "02", icon: BookOpen, title: "Complete the THREE actual tests", desc: "Work through the motivation, computer literacy, and problem-solving assessments to unlock the dashboard tools." },
  { num: "03", icon: Download, title: "Build and download your CV", desc: "Pick a career path and language, upload your CV, and download the generated one." },
];

const HowItWorks = () => (
  <section id="how-it-works" aria-labelledby="hiw-heading" className="py-14 sm:py-24 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3" aria-hidden="true">
          How it works
        </motion.p>
        <motion.h2 id="hiw-heading" variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
          It's just {" "}
          <span className="text-red-500">3 steps</span>
        </motion.h2>
      </motion.div>

      <motion.ol
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6 relative list-none m-0 p-0"
        role="list"
      >
        <div aria-hidden="true" className="hidden md:block absolute top-[3.375rem] left-[28%] right-[28%] h-[3px] overflow-visible">
          <div
            className="w-full h-full bg-gradient-to-r from-transparent via-red-500 to-transparent"
            style={{ filter: "blur(150%)", opacity: 0.45 }}
          />
        </div>

        {STEPS.map(({ num, icon: Icon, title, desc }, index) => (
          <motion.li key={num} variants={fadeUp} className="text-left p-6 rounded-2xl bg-slate-900">
            <div className="flex justify-center">
              <div aria-hidden="true" className={`relative inline-flex mb-6 ${index === 1 ? "how-it-works-icon-shell--middle" : ""}`}>
                <div className="step-icon-pattern how-it-works-icon-pattern w-16 h-16 rounded-2xl bg-white flex items-center justify-center relative">
                  <Icon size={48} className="text-black" />
                </div>
                <span className="hiw-step-badge absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-[3px] border-black text-black text-xs font-black flex items-center justify-center">
                  {num.slice(-1)}
                </span>
              </div>
            </div>
            <h3 className="text-white font-bold text-xl mb-3 text-left">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-left">{desc}</p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  </section>
);

export default HowItWorks;
