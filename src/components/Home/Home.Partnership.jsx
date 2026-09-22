import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Partnership = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section aria-labelledby="partnership-heading" className={isDark ? "py-14 sm:py-24 bg-slate-950" : "py-14 sm:py-24 bg-slate-100"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className=""
        >
          <motion.div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex min-h-[150px] sm:min-h-0 aspect-auto sm:aspect-[1.75/1] w-full max-w-full sm:max-w-[420px] flex-col items-center justify-center text-center bg-white p-5 sm:p-6 shadow-lg mx-auto">
              <img
                src="/developersinstitute-logo.png"
                alt="Developers.institute Tel Aviv logo"
                className="h-20 w-auto object-contain sm:h-28 lg:h-32"
                style={{ filter: "invert(1) hue-rotate(180deg) saturate(1.8)" }}
              />
            </div>
            <div className="space-y-3 text-left">
              <p className="text-red-500 text-xs font-bold tracking-widest uppercase">Partnership</p>
              <h2 id="partnership-heading" className={isDark ? "text-4xl sm:text-5xl font-black text-white break-words" : "text-4xl sm:text-5xl font-black text-slate-900 break-words"}>
                This project is supported by <span className="text-red-500 font-semibold [overflow-wrap:anywhere]">Developers.<wbr />institute Tel Aviv</span>
              </h2>
              <p className={isDark ? "text-gray-400 leading-relaxed text-lg max-w-lg" : "text-slate-600 leading-relaxed text-lg max-w-lg"}>
                Built with a native career-first approach and a focus on practical digital skills,
                OctoCV reflects the learning culture of Developers.institute Tel Aviv.
              </p>
              <a
                href="https://developers.institute/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold transition-colors"
              >
                Visit our website <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partnership;
