import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const CTA = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section aria-labelledby="cta-heading" className={isDark ? "py-28 relative overflow-hidden bg-gradient-to-b from-[#020617] via-[#0b1220] to-black" : "py-28 relative overflow-hidden bg-gradient-to-b from-slate-100 via-slate-200 to-white"}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-red-600/8 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-0 py-0"
        >
          <motion.h2 id="cta-heading" className={isDark ? "text-4xl sm:text-6xl font-black text-white mb-6" : "text-4xl sm:text-6xl font-black text-slate-900 mb-6"}>
            Ready to re/start<br />your <span className="text-red-500">career?</span>
          </motion.h2>
          <motion.p className={isDark ? "text-gray-400 text-xl mb-10 max-w-2xl mx-auto" : "text-slate-600 text-xl mb-10 max-w-2xl mx-auto"}>
            Join professionals who use OctoCV to build streamlined CVs to find
            roles that match their best ambitions.
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="hero-cta hero-cta-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-200"
            >
              Get started <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <Link
              to="/login"
              className={`hero-cta hero-cta-secondary inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-opacity duration-200 ${isDark ? "hero-cta-secondary--dark text-white" : "hero-cta-secondary--light text-slate-900"}`}
            >
              Sign in
            </Link>
          </motion.div>
          <motion.p className={isDark ? "text-gray-600 text-sm mt-6" : "text-slate-500 text-sm mt-6"}>
            <strong>Free</strong> &nbsp; · &nbsp;  No card required &nbsp; · &nbsp; Set up in minutes
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
