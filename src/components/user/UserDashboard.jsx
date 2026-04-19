import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, ArrowLeft, ArrowRight, FileText, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const variants = {
  enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0, position: "absolute" }),
  center: { x: 0, opacity: 1, position: "relative", transition: { duration: 0.5, ease: "easeInOut" } },
  exit: (direction) => ({ x: direction > 0 ? -100 : 100, opacity: 0, position: "absolute", transition: { duration: 0.5, ease: "easeInOut" } }),
};

export default function MockDashboard() {
  const userInfo = {
    first_name: "Pam",
    username: "pamstr",
    email: "pamellaester.ps@gmail.com",
  };

  const [careerStages, setCareerStages] = useState([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchCareerMap = async () => {
      try {
        const response = await axiosInstance.post("/api/career-map/", { job_title: "Full Stack Developer" });
        setCareerStages(response.data);
      } catch (error) {
        console.error("Error fetching career map:", error);
      }
    };
    fetchCareerMap();
  }, []);

  const goPrev = () => {
    if (isAnimating || careerStages.length === 0) return;
    setDirection(-1); setIsAnimating(true);
    setCurrentStage((prev) => (prev === 0 ? careerStages.length - 1 : prev - 1));
  };

  const goNext = () => {
    if (isAnimating || careerStages.length === 0) return;
    setDirection(1); setIsAnimating(true);
    setCurrentStage((prev) => (prev === careerStages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-slate-950 px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black text-white mb-8">
        Welcome back, <span className="text-red-500">{userInfo.first_name}</span>!
      </h1>

      {/* Career Journey */}
      <section className="relative bg-slate-900 border border-white/5 rounded-2xl p-8 mb-6 overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <Compass className="w-4 h-4 text-red-400" />
          </div>
          <h2 className="text-base font-bold text-white">Career Journey</h2>
        </div>

        <div className="relative min-h-[160px]">
          <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
            {careerStages.length > 0 && (
              <motion.div
                key={careerStages[currentStage].stage_number}
                custom={direction} variants={variants}
                initial="enter" animate="center" exit="exit"
                className="text-center"
              >
                <h3 className="text-lg font-bold text-white mb-2">{careerStages[currentStage].stage_title}</h3>
                <p className="text-sm text-gray-400 mb-4">{careerStages[currentStage].goal}</p>
                <div className="flex justify-center flex-wrap gap-2">
                  {careerStages[currentStage].skills.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button onClick={goPrev} disabled={isAnimating}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition disabled:opacity-40">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button onClick={goNext} disabled={isAnimating}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition disabled:opacity-40">
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex justify-center gap-1.5 mt-6">
          {careerStages.map((_, idx) => (
            <button key={idx}
              onClick={() => { if (isAnimating || idx === currentStage) return; setDirection(idx > currentStage ? 1 : -1); setIsAnimating(true); setCurrentStage(idx); }}
              className={`h-1.5 rounded-full transition-all ${currentStage === idx ? "w-6 bg-red-500" : "w-1.5 bg-white/20"}`}
              aria-label={`Step ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-white">Profile</h3>
          </div>
          <p className="text-xs text-gray-500 mb-1">Username</p>
          <p className="text-sm text-gray-300 mb-3">{userInfo.username}</p>
          <p className="text-xs text-gray-500 mb-1">Email</p>
          <p className="text-sm text-gray-300 truncate">{userInfo.email}</p>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-white">CV Builder</h3>
          </div>
          <p className="text-xs text-gray-400 mb-4 flex-1">Generate your AI-optimized CV tailored to your career path.</p>
          <Link to="/make"
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl px-4 py-2.5 transition-colors">
            <FileText className="w-4 h-4" /> Generate CV
          </Link>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-white">Settings</h3>
          </div>
          <p className="text-xs text-gray-400 mb-4 flex-1">Update your profile, change password, or manage your account.</p>
          <Link to="/settings"
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-xl px-4 py-2.5 transition-colors">
            <Settings className="w-4 h-4" /> Manage
          </Link>
        </div>
      </section>
    </div>
  );
}
