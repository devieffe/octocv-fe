import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText, Brain, Map, Target, BarChart3, Sparkles,
  CheckCircle, ArrowRight, Menu, X, Zap,
  Shield, Users, Award, TrendingUp, BookOpen, Sun, Moon,
} from "lucide-react";
import myImage from "../assets/HomePage/man.png";
import { useTheme } from "../context/ThemeContext";

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();  const location = useLocation();
  const bgState = { backgroundLocation: location };
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Assessments", href: "#assessments" },
    { label: "About", href: "#about" },
  ];

  return (
    <header
      role="banner"
      aria-label="Site header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-slate-950/95 backdrop-blur-md shadow-lg"
        : "bg-transparent"
        }`}
    >
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded-xl focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            aria-label="OctoCV — home"
            className="text-2xl font-black text-white tracking-tight"
          >
            Octo<span className="text-red-500" aria-hidden="true">CV</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Page sections" className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:rounded"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              state={bgState}
              className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              state={bgState}
              className="text-sm font-semibold bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Get started
            </Link>
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={theme === "light"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="ml-1 w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              {theme === "dark"
                ? <Sun size={16} aria-hidden="true" />
                : <Moon size={16} aria-hidden="true" />
              }
            </button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme toggle (mobile) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={theme === "light"}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              {theme === "dark"
                ? <Sun size={16} aria-hidden="true" />
                : <Moon size={16} aria-hidden="true" />
              }
            </button>
            {/* Hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:rounded"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-slate-950 border-t border-white/5 px-4 py-4 flex flex-col gap-4"
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <Link
            to="/login"
            state={bgState}
            className="text-sm text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            state={bgState}
            className="text-sm font-semibold bg-red-600 text-white px-4 py-2 rounded-lg text-center"
            onClick={() => setMenuOpen(false)}
          >
            Get started
          </Link>
        </motion.nav>
      )}
    </header>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section
    aria-labelledby="hero-heading"
    className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-slate-950"
  >
    {/* Ambient blobs — decorative */}
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">
      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-red-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/6 rounded-full blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-0">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* Left — copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-7">
          <motion.div variants={fadeUp}>
            <span
              aria-label="AI-Powered Career Platform badge"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide"
            >
              <Sparkles size={12} aria-hidden="true" />
              AI-Powered Career Platform
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.04] tracking-tight"
          >
            Land your dream<br />
            job with{" "}
            <span className="text-red-500">OctoCV</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl text-gray-400 leading-relaxed max-w-lg">
            AI-optimized CVs, personalised career paths, and skills assessments —
            everything you need to accelerate your career.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Start for free <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              See how it works
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-5 pt-1">
            <div className="flex -space-x-2" aria-hidden="true">
              {["JD", "AL", "KM", "PR"].map((init) => (
                <div
                  key={init}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-2 border-slate-950 flex items-center justify-center text-white text-[10px] font-bold"
                >
                  {init}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              Professionals trust OctoCV
            </p>
          </motion.div>
        </motion.div>

        {/* Right — visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 32 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative flex justify-center lg:justify-end"
          aria-hidden="true"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/15 rounded-full blur-2xl scale-110" />
            <div className="relative w-[440px] h-[440px] bg-red-500/10 rounded-full border border-red-500/10 overflow-hidden flex items-center justify-center">
              <img
                src={myImage}
                alt="Career professional — OctoCV platform user"
                width={440}
                height={440}
                className="scale-x-[-1] w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Floating card — supported upload formats */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
              className="absolute -left-8 top-1/3 bg-slate-900/90 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                  <CheckCircle size={18} className="text-green-400" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500">Upload formats</p>
                  <p className="text-sm font-bold text-white">PDF · DOC · DOCX</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card — career planning */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              aria-hidden="true"
              className="absolute -right-6 bottom-1/3 bg-slate-900/90 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                  <TrendingUp size={18} className="text-red-400" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500">Career planning</p>
                  <p className="text-sm font-bold text-white">Step by step</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card — AI match score */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
              aria-hidden="true"
              className="absolute right-3 -top-2 bg-slate-900/90 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                  <Award size={18} className="text-red-400" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500">AI Match</p>
                  <p className="text-sm font-bold text-white">92% fit</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Stats bar ────────────────────────────────────────────────────────────────
const STATS = [
  { value: "3", label: "career assessments" },
  { value: "5 MB", label: "CV upload limit" },
  { value: "PDF", label: "DOC and DOCX supported" },
  { value: "1", label: "personal career map" },
];

const Stats = () => (
  <section aria-label="Platform statistics" className="bg-slate-900 border-y border-white/5 py-14">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.dl
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {STATS.map(({ value, label }) => (
          <motion.div key={label} variants={fadeUp} className="text-center">
            <dt className="sr-only">{label}</dt>
            <dd className="text-4xl font-black text-red-500" aria-label={`${value} ${label}`}>
              {value}
              <span className="block text-sm text-gray-400 font-normal mt-1" aria-hidden="true">{label}</span>
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </div>
  </section>
);

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: FileText, title: "AI CV builder", desc: "Upload a PDF, DOC, or DOCX CV, choose a career path and language, then generate an enhanced downloadable CV." },
  { icon: Brain, title: "Three assessments", desc: "Complete the motivation, computer literacy, and problem-solving tests to unlock the career tools in your dashboard." },
  { icon: Map, title: "Career path map", desc: "Choose a career path and receive a staged roadmap with goals, skills, capabilities, and learning paths." },
  { icon: Target, title: "Personal profile", desc: "Review and update your name and account details from settings while keeping your OctoCV profile in one place." },
  { icon: BarChart3, title: "Assessment progress", desc: "See which onboarding tests are complete and continue from the right step in your dashboard." },
  { icon: Shield, title: "Verified account", desc: "Confirm your email before signing in, with password change, reset, and account deletion controls available." },
];

const Features = () => (
  <section id="features" aria-labelledby="features-heading" className="py-24 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3" aria-hidden="true">
          Platform Features
        </motion.p>
        <motion.h2 id="features-heading" variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
          A practical toolkit for{" "}
          <span className="text-red-500">your next role</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
          OctoCV connects your assessments, career direction, and CV creation in one focused workflow.
        </motion.p>
      </motion.div>

      <motion.ul
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none m-0 p-0"
        role="list"
      >
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <motion.li
            key={title}
            variants={fadeUp}
            className="group p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-red-500/25 hover:bg-slate-800/60 transition-all duration-300"
          >
            <div
              aria-hidden="true"
              className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors"
            >
              <Icon size={22} className="text-red-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </section>
);

// ─── How it works ─────────────────────────────────────────────────────────────
const STEPS = [
  { num: "01", icon: Users, title: "Create and verify your account", desc: "Register with your name, username, email, and password, then confirm your email address." },
  { num: "02", icon: BookOpen, title: "Complete the three tests", desc: "Work through the motivation, computer literacy, and problem-solving assessments to unlock the dashboard tools." },
  { num: "03", icon: Zap, title: "Build and download your CV", desc: "Choose a career path and language, upload your existing CV, and download the generated DOCX when it is ready." },
];

const HowItWorks = () => (
  <section id="how-it-works" aria-labelledby="hiw-heading" className="py-24 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3" aria-hidden="true">
          How it works
        </motion.p>
        <motion.h2 id="hiw-heading" variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
          Up and running in{" "}
          <span className="text-red-500">3 steps</span>
        </motion.h2>
      </motion.div>

      <motion.ol
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-10 relative list-none m-0 p-0"
        role="list"
      >
        {/* Connector line */}
        <div aria-hidden="true" className="hidden md:block absolute top-[3.25rem] left-[28%] right-[28%] h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />

        {STEPS.map(({ num, icon: Icon, title, desc }) => (
          <motion.li key={num} variants={fadeUp} className="text-center">
            <div aria-hidden="true" className="relative inline-flex mb-6">
              <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                <Icon size={28} className="text-white" />
              </div>
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 border border-red-500/40 text-red-400 text-xs font-black flex items-center justify-center">
                {num.slice(-1)}
              </span>
            </div>
            <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{desc}</p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  </section>
);

// ─── Dashboard toolkit ────────────────────────────────────────────────────────
const DASHBOARD_FEATURES = [
  { icon: Brain, title: "Assessment status", text: "Track motivation, literacy, and problem-solving completion from onboarding." },
  { icon: Map, title: "Career stages", text: "Move through the goals and skills connected to your selected career path." },
  { icon: FileText, title: "CV workspace", text: "Upload your existing CV and download the generated DOCX from the builder." },
];

const DashboardToolkit = () => (
  <section id="assessments" aria-labelledby="assessments-heading" className="py-24 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3" aria-hidden="true">
          Inside your dashboard
        </motion.p>
        <motion.h2 id="assessments-heading" variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
          Turn your answers into{" "}<span className="text-red-500">action</span>
        </motion.h2>
      </motion.div>

      <motion.ul
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6 list-none m-0 p-0"
        role="list"
      >
        {DASHBOARD_FEATURES.map(({ icon: Icon, title, text }) => (
          <motion.li
            key={title}
            variants={fadeUp}
            className="p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-white/10 transition-colors flex flex-col gap-4"
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

// ─── About / Mission ──────────────────────────────────────────────────────────
const PILLARS = [
  { icon: Award, title: "Evidence-led", desc: "Your assessments and chosen career path shape the tools you use next." },
  { icon: Shield, title: "You control your account", desc: "Update your profile, change your password, or delete your account from settings." },
  { icon: Sparkles, title: "Built for a real workflow", desc: "Move from verification to assessment, career planning, CV generation, and download." },
];

const About = () => (
  <section id="about" aria-labelledby="about-heading" className="py-24 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase" aria-hidden="true">
            About OctoCV
          </motion.p>
          <motion.h2 id="about-heading" variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
            Built for the{" "}
            <span className="text-red-500">modern job seeker</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed text-lg">
            OctoCV was founded with a single belief: finding the right job should be about
            your skills, not your network. We built an AI-first platform that levels the
            playing field for every professional — whether you&apos;re starting out, switching
            fields, or climbing to the top.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:rounded"
            >
              Join OctoCV today <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Pillars */}
        <motion.ul
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="space-y-4 list-none m-0 p-0"
          role="list"
        >
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className="flex gap-4 p-5 rounded-2xl bg-slate-800/50 border border-white/5"
            >
              <div
                aria-hidden="true"
                className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0"
              >
                <Icon size={20} className="text-red-400" />
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

// ─── CTA band ─────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What is OctoCV for?",
    a: "OctoCV helps job seekers turn their skills, assessments, and experience into a sharper career profile. You can complete onboarding tests, choose a career path, build an AI-enhanced CV, and download the outcome in a clean format.",
  },
  {
    q: "Do I need to upload a CV before starting?",
    a: "No. You can begin with your profile and assessments, then upload an existing CV later when you are ready to generate or improve your final document.",
  },
  {
    q: "Can I use OctoCV for different career paths?",
    a: "Yes. The platform supports multiple career routes and helps guide you with stages, skills, and personal goals aligned to the role you want to pursue.",
  },
  {
    q: "Is my account information secure?",
    a: "Yes. OctoCV includes account verification, profile management, password control, and user settings so you remain in control of your information.",
  },
];

const FAQ = () => (
  <section id="faq" aria-labelledby="faq-heading" className="py-24 bg-slate-900">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="text-center mb-12"
      >
        <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3" aria-hidden="true">
          FAQ
        </motion.p>
        <motion.h2 id="faq-heading" variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
          Questions, answered.
        </motion.h2>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
        {FAQ_ITEMS.map(({ q, a }) => (
          <motion.details
            key={q}
            variants={fadeUp}
            open={false}
            className="group rounded-2xl border border-white/10 bg-slate-950/70 p-5 transition-colors hover:border-red-500/25"
          >
            <summary className="cursor-pointer list-none text-left text-lg font-semibold text-white flex items-center justify-between gap-4">
              <span>{q}</span>
              <span className="text-red-400 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-gray-400 leading-relaxed">{a}</p>
          </motion.details>
        ))}
      </motion.div>
    </div>
  </section>
);

const Partnership = () => (
  <section aria-labelledby="partnership-heading" className="py-24 bg-slate-950">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="rounded-3xl border border-red-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-8 sm:p-10 lg:p-12"
      >
        <motion.div variants={fadeUp} className="flex flex-col items-center text-center gap-6">
          <img
            src="/developersinstitute-logo.png"
            alt="Developers.institute Tel Aviv logo"
            className="h-32 w-auto object-contain"
          />
          <div className="space-y-3">
            <p className="text-red-500 text-xs font-bold tracking-widest uppercase">Partnership</p>
            <h2 id="partnership-heading" className="text-3xl sm:text-4xl font-black text-white">
              This project was made in partnership with <span className="text-red-500">Developers.institute Tel Aviv</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Built with a career-first approach and a strong focus on practical digital skills,
              OctoCV reflects the learning and innovation culture of Developers.institute Tel Aviv.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const CTA = () => (
  <section aria-labelledby="cta-heading" className="py-28 bg-slate-950 relative overflow-hidden">
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-red-600/8 rounded-full blur-3xl" />
    </div>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
      <motion.div
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <motion.h2 id="cta-heading" variants={fadeUp} className="text-4xl sm:text-6xl font-black text-white mb-6">
          Ready to launch<br />your <span className="text-red-500">career?</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
          Join thousands of professionals who use OctoCV to build standout CVs and find
          roles that match their ambitions.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-500 text-white text-lg font-bold rounded-xl transition-all hover:shadow-xl hover:shadow-red-500/25 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Get started free <ArrowRight size={20} aria-hidden="true" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white/5 hover:bg-white/10 text-white text-lg font-semibold rounded-xl border border-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Sign in
          </Link>
        </motion.div>
        <motion.p variants={fadeUp} className="text-gray-600 text-sm mt-6">
          Free forever · No credit card required · Set up in minutes
        </motion.p>
      </motion.div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  Product: ["Features", "How it works", "Career Guide", "CV Templates"],
  Resources: ["Documentation", "Blog", "FAQ", "Changelog"],
  Company: ["About", "Careers", "Privacy Policy", "Terms of Service"],
};

const Footer = () => {
  return (
    <footer aria-label="Site footer" className="bg-transparent pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-0">
          {/* Brand */}
          <div>
            <Link to="/" aria-label="OctoCV home" className="text-2xl font-black text-white tracking-tight">
              Octo<span className="text-red-500" aria-hidden="true">CV</span>
            </Link>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              AI-powered career platform helping professionals land roles they love.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                {
                  label: "Twitter / X",
                  path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
                },
                {
                  label: "LinkedIn",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
                {
                  label: "GitHub",
                  path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z",
                },
              ].map(({ label, path }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={`OctoCV on ${label}`}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <nav key={category} aria-label={`${category} links`}>
              <h2 className="text-white font-semibold text-sm mb-4">{category}</h2>
              <ul className="space-y-2 list-none m-0 p-0">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-300 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:rounded"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
};

// ─── Page assembly ────────────────────────────────────────────────────────────
const HomePage = () => {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900"}>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <DashboardToolkit />
        <About />
        <FAQ />
        <Partnership />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
