import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Shield, Sparkles, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const PILLARS = [
  { icon: Award, title: "Data-led decisions", desc: "Your assessments and chosen career path shape the tools you use next." },
  { icon: Shield, title: "You have control of your account", desc: "Update your profile, change your password, or delete your account from settings." },
  { icon: Sparkles, title: "Built for a real workflow", desc: "Move from verification to initial assessment, career planning, and CV generation with AI." },
];

const About = () => (
  <section id="about" aria-labelledby="about-heading" className="py-24 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase" aria-hidden="true">
            About OctoCV
          </motion.p>
          <motion.h2 id="about-heading" variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
            Built for the <span className="text-red-500">modern job seekers</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed text-lg">
            OctoCV was founded with a single aim: finding the job should be about your skills in priority. It's an AI helper that levels the playing field for professionals.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 mb-1 text-red-400 hover:text-red-300 font-semibold transition-colors"
            >
              Join OctoCV now <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4 list-none m-0 p-0"
          role="list"
        >
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className="flex gap-4 p-5 rounded-2xl bg-slate-800/50 border border-white/5 tv-noise"
            >
              <div
                aria-hidden="true"
                className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0"
              >
                <Icon size={32} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  </section>
);

export default About;
