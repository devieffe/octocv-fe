import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, ArrowRight, TrendingUp, Award } from "lucide-react";
import myImage from "../../assets/HomePage/man.png";
import { useTheme } from "../../context/ThemeContext";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const MotionLink = motion(Link);

const HeroVisual = ({ isDark, bubbleCardClass, bubbleLabelClass, bubbleTextClass, mobile = false }) => (
  <motion.div
    initial={mobile ? { opacity: 0, scale: 0.96 } : { opacity: 0, scale: 0.92, x: 32 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: mobile ? 0.05 : 0.15 }}
    className={`relative z-[60] flex justify-center items-center w-full ${mobile ? "lg:hidden" : "hidden lg:flex"}`}
    aria-hidden="true"
  >
    <div className="relative z-[60] w-full max-w-[min(100%,414px)] sm:max-w-[552px] lg:max-w-[690px] flex items-center justify-center">
      <div className={`hero-picture-circle relative z-[80] w-full aspect-square rounded-full overflow-hidden flex items-center justify-center -translate-y-[30px] ${isDark ? "hero-picture-circle--dark" : "hero-picture-circle--light"}`}>
        <img
          src={myImage}
          alt="Career professional — OctoCV platform user"
          width={440}
          height={440}
          className="scale-x-[-1] w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
      </div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute z-[100] -left-2 sm:-left-8 top-1/3 rounded-2xl p-2.5 sm:p-3 ${bubbleCardClass} tv-noise ${isDark ? "tv-noise--dark" : "tv-noise--light"}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-green-500/15 flex items-center justify-center"><CheckCircle size={16} className="text-green-400 sm:w-[18px] sm:h-[18px]" /></div>
          <div><p className={`text-[10px] sm:text-[11px] ${bubbleLabelClass}`}>CV Score</p><p className={`text-xs sm:text-sm font-bold ${bubbleTextClass}`}>96 / 100</p></div>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className={`absolute z-[100] -right-2 sm:-right-6 bottom-1/3 rounded-2xl p-2.5 sm:p-3 ${bubbleCardClass} tv-noise ${isDark ? "tv-noise--dark" : "tv-noise--light"}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-red-500/15 flex items-center justify-center"><TrendingUp size={16} className="text-red-400 sm:w-[18px] sm:h-[18px]" /></div>
          <div><p className={`text-[10px] sm:text-[11px] ${bubbleLabelClass}`}>Match Rate</p><p className={`text-xs sm:text-sm font-bold ${bubbleTextClass}`}>+95%</p></div>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        className={`absolute z-[100] right-2 sm:right-3 -top-2 rounded-2xl p-2.5 sm:p-3 ${bubbleCardClass} tv-noise ${isDark ? "tv-noise--dark" : "tv-noise--light"}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-red-500/15 flex items-center justify-center"><Award size={16} className="text-red-400 sm:w-[18px] sm:h-[18px]" /></div>
          <div><p className={`text-[10px] sm:text-[11px] ${bubbleLabelClass}`}>AI Match</p><p className={`text-xs sm:text-sm font-bold ${bubbleTextClass}`}>92% fit</p></div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bubbleCardClass = isDark
    ? "bg-slate-900/35 border border-white/10 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/40"
    : "bg-white/35 border border-slate-200/80 shadow-xl backdrop-blur-xl supports-[backdrop-filter]:bg-white/45";

  const bubbleLabelClass = isDark ? "text-gray-500" : "text-slate-500";
  const bubbleTextClass = isDark ? "text-white" : "text-slate-900";

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className={`relative min-h-screen flex items-center pt-16 overflow-hidden ${isDark ? "bg-slate-950" : "bg-slate-100"}`}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none z-0">
        <div className={`hero-ambient-glow hero-ambient-glow--one absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 ${isDark ? "hero-ambient-glow--dark" : "hero-ambient-glow--light"}`} />
        <div className={`hero-dots-overlay absolute inset-0 z-10 ${isDark ? "hero-dots-overlay--dark" : "hero-dots-overlay--light"}`} />
        <div className={`hero-ambient-glow hero-ambient-glow--two absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl z-0 ${isDark ? "bg-slate-400/10" : "bg-slate-400/20"}`} />
        <div className={`hero-ambient-glow hero-ambient-glow--three absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl z-0 ${isDark ? "bg-slate-500/10" : "bg-slate-400/15"}`} />
        <div className={`absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b to-transparent z-[15] ${isDark ? "from-slate-950" : "from-white"}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-20 lg:py-0 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5 sm:space-y-7 pt-2 sm:pt-8 pb-8 lg:pb-[80px]">
            <motion.div variants={fadeUp} className="-mb-2">
              <span
                aria-label="AI-Powered Career Platform badge"
                className={`inline-flex items-center gap-1 text-xs font-semibold tracking-wide uppercase ${isDark ? "text-red-400" : "text-red-600"}`}
              >
                <Sparkles size={20} aria-hidden="true" />
                AI-powered career application
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.04] tracking-tight"
            >
              <span className="hero-heading inline">Get your job with</span>{" "}
              <span className={`${isDark ? "text-slate-950" : "text-slate-900"} hero-word-octo inline`}>Octo</span>
              <span className="text-red-500 hero-word-cv inline">CV</span>
            </motion.h1>

            <motion.p variants={fadeUp} className={`w-full text-base sm:text-lg leading-relaxed max-w-lg ${isDark ? "text-gray-400" : "text-slate-600"}`}>
              Career <strong>paths</strong>, skills <strong>assessments</strong>, <nobr>AI-optimized</nobr> technical <strong>CV</strong>s. A practical tool set to enhance your career opportunities.
            </motion.p>

            <HeroVisual isDark={isDark} bubbleCardClass={bubbleCardClass} bubbleLabelClass={bubbleLabelClass} bubbleTextClass={bubbleTextClass} mobile />

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 sm:gap-4">
              <MotionLink
                to="/signup"
                variants={fadeUp}
                className="hero-cta hero-cta-primary inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 sm:py-4 text-white font-semibold rounded-xl transition-all duration-200"
              >
                Start for free <ArrowRight size={18} aria-hidden="true" />
              </MotionLink>
              <motion.a
                href="#how-it-works"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className={`hero-cta hero-cta-secondary inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 sm:py-4 font-semibold rounded-xl transition-opacity duration-200 ${isDark ? "hero-cta-secondary--dark text-white" : "hero-cta-secondary--light text-slate-900"}`}
              >
                See how it works
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-5 pt-1">
              <div className="flex -space-x-2" aria-hidden="true">
                {['JD', 'AL', 'KM', 'PR'].map((init) => (
                  <div
                    key={init}
                    className={`w-8 h-8 rounded-full bg-transparent border-2 ${isDark ? "border-slate-950" : "border-slate-100"}`}
                  />
                ))}
              </div>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                <span className="font-semibold">150+ users</span> trust OctoCV
              </p>
            </motion.div>
          </motion.div>

          <HeroVisual isDark={isDark} bubbleCardClass={bubbleCardClass} bubbleLabelClass={bubbleLabelClass} bubbleTextClass={bubbleTextClass} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
