import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText, Brain, Map, Target, BarChart3, Sparkles,
  CheckCircle, ArrowRight, Star, Menu, X, Zap,
  Shield, Users, Award, TrendingUp, BookOpen,
} from 'lucide-react';
import myImage from '../assets/HomePage/man.png';

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black text-white tracking-tight">
            Octo<span className="text-red-500">CV</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="text-sm font-semibold bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg transition-colors"
            >
              Get started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
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
          <Link to="/login" className="text-sm text-gray-300 hover:text-white">
            Sign in
          </Link>
          <Link
            to="/signup"
            className="text-sm font-semibold bg-red-600 text-white px-4 py-2 rounded-lg text-center"
          >
            Get started
          </Link>
        </motion.div>
      )}
    </header>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-slate-950">
    {/* Ambient blobs */}
    <div className="absolute inset-0 pointer-events-none select-none">
      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-red-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/6 rounded-full blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-0">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* Left — copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-7">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide">
              <Sparkles size={12} />
              AI-Powered Career Platform
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.04] tracking-tight"
          >
            Land your dream<br />
            job with{' '}
            <span className="text-red-500">OctoCV</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl text-gray-400 leading-relaxed max-w-lg">
            AI-optimized CVs, personalized career paths, and skills assessments —
            everything you need to accelerate your career.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5"
            >
              Start for free <ArrowRight size={18} />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all duration-200"
            >
              See how it works
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-5 pt-1">
            <div className="flex -space-x-2">
              {['JD', 'AL', 'KM', 'PR'].map((init) => (
                <div
                  key={init}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-2 border-slate-950 flex items-center justify-center text-white text-[10px] font-bold"
                >
                  {init}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              <span className="text-white font-semibold">5,000+</span> professionals trust OctoCV
            </p>
          </motion.div>
        </motion.div>

        {/* Right — visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 32 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/15 rounded-full blur-2xl scale-110" />
            <div className="relative w-[440px] h-[440px] bg-red-500/10 rounded-full border border-red-500/10 overflow-hidden flex items-center justify-center">
              <img
                src={myImage}
                alt="Career professional"
                className="scale-x-[-1] w-full h-full object-cover"
              />
            </div>

            {/* Floating card — CV score */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-6 top-1/3 bg-slate-900 border border-white/10 rounded-2xl p-3 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                  <CheckCircle size={18} className="text-green-400" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500">CV Score</p>
                  <p className="text-sm font-bold text-white">96 / 100</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card — match rate */}
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -right-6 bottom-1/3 bg-slate-900 border border-white/10 rounded-2xl p-3 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                  <TrendingUp size={18} className="text-red-400" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500">Match Rate</p>
                  <p className="text-sm font-bold text-white">+95%</p>
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
  { value: '10K+', label: 'CVs Generated' },
  { value: '5K+', label: 'Active Users' },
  { value: '200+', label: 'Partner Companies' },
  { value: '95%', label: 'Job Match Rate' },
];

const Stats = () => (
  <section className="bg-slate-900 border-y border-white/5 py-14">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {STATS.map(({ value, label }) => (
          <motion.div key={label} variants={fadeUp} className="text-center">
            <p className="text-4xl font-black text-red-500">{value}</p>
            <p className="text-sm text-gray-400 mt-1">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: FileText,
    title: 'AI CV Builder',
    desc: 'Generate tailored, ATS-optimized CVs in minutes using advanced AI trained on thousands of successful resumes.',
  },
  {
    icon: Brain,
    title: 'Skills Assessment',
    desc: 'Comprehensive questionnaires that evaluate your technical skills, problem-solving ability, and career fit.',
  },
  {
    icon: Map,
    title: 'Career Path Planner',
    desc: 'Get a personalized roadmap of skills and milestones needed to reach your target role.',
  },
  {
    icon: Target,
    title: 'Job Matching',
    desc: 'Intelligent matching algorithms surface the roles most aligned with your background and aspirations.',
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    desc: 'Track your growth, identify skill gaps, and benchmark against professionals in your field.',
  },
  {
    icon: Shield,
    title: 'Smart Templates',
    desc: 'Industry-specific CV templates crafted by hiring experts to make you stand out from day one.',
  },
];

const Features = () => (
  <section id="features" className="py-24 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3">
          Platform Features
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
          Everything you need to{' '}
          <span className="text-red-500">advance your career</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
          OctoCV combines AI, career intelligence, and human-centered design to give you
          an unfair advantage in the job market.
        </motion.p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="group p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-red-500/25 hover:bg-slate-800/60 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
              <Icon size={22} className="text-red-400" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── How it works ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    icon: Users,
    title: 'Create your account',
    desc: 'Sign up in seconds — no credit card required. Tell us about your background and career goals.',
  },
  {
    num: '02',
    icon: BookOpen,
    title: 'Complete your assessment',
    desc: 'Take our adaptive skills and personality tests so our AI can build an accurate picture of your strengths.',
  },
  {
    num: '03',
    icon: Zap,
    title: 'Get your career toolkit',
    desc: 'Receive your AI-generated CV, personalized career roadmap, and top job matches — ready to go.',
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3">
          How it works
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
          Up and running in{' '}
          <span className="text-red-500">3 steps</span>
        </motion.h2>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-10 relative"
      >
        {/* Connector line */}
        <div className="hidden md:block absolute top-[3.25rem] left-[28%] right-[28%] h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />

        {STEPS.map(({ num, icon: Icon, title, desc }) => (
          <motion.div key={num} variants={fadeUp} className="text-center">
            <div className="relative inline-flex mb-6">
              <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                <Icon size={28} className="text-white" />
              </div>
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 border border-red-500/40 text-red-400 text-xs font-black flex items-center justify-center">
                {num.slice(-1)}
              </span>
            </div>
            <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Alexandra Liu',
    role: 'UX Designer at Figma',
    stars: 5,
    text: "OctoCV's AI caught gaps in my CV I had completely overlooked. Within two weeks of using the platform I landed three interviews at top companies.",
  },
  {
    name: 'Marcus Williams',
    role: 'Backend Engineer at Stripe',
    stars: 5,
    text: "The career path planner showed me exactly which skills to build to move from mid to senior. Six months later I got promoted with a 40% pay rise.",
  },
  {
    name: 'Priya Nair',
    role: 'Product Manager at HubSpot',
    stars: 5,
    text: "I was switching industries with no idea how to position myself. OctoCV's assessments helped me present my transferable skills in a compelling way.",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3">
          Testimonials
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
          Loved by{' '}
          <span className="text-red-500">professionals</span>
        </motion.h2>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6"
      >
        {TESTIMONIALS.map(({ name, role, stars, text }) => (
          <motion.div
            key={name}
            variants={fadeUp}
            className="p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-white/10 transition-colors flex flex-col gap-4"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} size={14} className="fill-red-500 text-red-500" />
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed flex-1">"{text}"</p>
            <div>
              <p className="text-white font-semibold text-sm">{name}</p>
              <p className="text-gray-500 text-xs">{role}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── About / Mission ──────────────────────────────────────────────────────────
const PILLARS = [
  { icon: Award, title: 'Merit-first', desc: 'We believe skills and potential should speak louder than credentials or connections.' },
  { icon: Shield, title: 'Privacy by design', desc: 'Your data is encrypted at rest and never sold to third parties. Period.' },
  { icon: Sparkles, title: 'Always improving', desc: 'Our AI models are retrained monthly on real hiring signals to stay ahead of market trends.' },
];

const About = () => (
  <section id="about" className="py-24 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.p variants={fadeUp} className="text-red-500 text-xs font-bold tracking-widest uppercase">
            About OctoCV
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white">
            Built for the{' '}
            <span className="text-red-500">modern job seeker</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed text-lg">
            OctoCV was founded with a single belief: finding the right job should be about
            your skills, not your network. We built an AI-first platform that levels the
            playing field for every professional — whether you're starting out, switching
            fields, or climbing to the top.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold text-sm transition-colors"
            >
              Join OctoCV today <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Pillars */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex gap-4 p-5 rounded-2xl bg-slate-800/50 border border-white/5"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-red-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">{title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── CTA band ─────────────────────────────────────────────────────────────────
const CTA = () => (
  <section className="py-28 bg-slate-950 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-red-600/8 rounded-full blur-3xl" />
    </div>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 variants={fadeUp} className="text-4xl sm:text-6xl font-black text-white mb-6">
          Ready to launch<br />
          your <span className="text-red-500">career?</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
          Join thousands of professionals who use OctoCV to build standout CVs and find
          roles that match their ambitions.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-500 text-white text-lg font-bold rounded-xl transition-all hover:shadow-xl hover:shadow-red-500/25 hover:-translate-y-0.5"
          >
            Get started free <ArrowRight size={20} />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white/5 hover:bg-white/10 text-white text-lg font-semibold rounded-xl border border-white/10 transition-all"
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
  Product: ['Features', 'How it works', 'Career Guide', 'CV Templates'],
  Resources: ['Documentation', 'Blog', 'FAQ', 'Changelog'],
  Company: ['About', 'Careers', 'Privacy Policy', 'Terms of Service'],
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-black text-white tracking-tight">
              Octo<span className="text-red-500">CV</span>
            </Link>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              AI-powered career platform helping professionals land roles they love.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {/* Twitter / X */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© {year} OctoCV. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── Page assembly ────────────────────────────────────────────────────────────
const HomePage = () => (
  <div className="bg-slate-950">
    <Navbar />
    <Hero />
    <Stats />
    <Features />
    <HowItWorks />
    <Testimonials />
    <About />
    <CTA />
    <Footer />
  </div>
);

export default HomePage;
