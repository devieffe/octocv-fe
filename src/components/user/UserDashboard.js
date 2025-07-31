import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, ArrowLeft, ArrowRight, FileText, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    position: "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    position: "absolute",
    transition: { duration: 0.5, ease: "easeInOut" },
  }),
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
        const response = await axiosInstance.post("/api/career-map/", {
          job_title: "Full Stack Developer",
        });
        setCareerStages(response.data);
      } catch (error) {
        console.error("Error fetching career map:", error);
      }
    };
    fetchCareerMap();
  }, []);

  const goPrev = () => {
    if (isAnimating || careerStages.length === 0) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentStage((prev) => (prev === 0 ? careerStages.length - 1 : prev - 1));
  };

  const goNext = () => {
    if (isAnimating || careerStages.length === 0) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentStage((prev) => (prev === careerStages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6 space-y-12 sm:p-8 max-w-6xl mx-auto overflow-y-auto">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-[#e91919] select-none drop-shadow-sm mb-4">
          Welcome, {userInfo.first_name}!
        </h1>

        {/* Career Journey Card */}
        <section className="relative bg-white border border-[#f8d7da] rounded-3xl shadow-lg p-8  mx-auto overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#e91919] p-3 rounded-full shadow">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#e91919]">Career Journey</h2>
          </div>

          <div className="relative min-h-[180px]">
            <AnimatePresence
              initial={false}
              custom={direction}
              onExitComplete={() => setIsAnimating(false)}
            >
              {careerStages.length > 0 && (
                <motion.div
                  key={careerStages[currentStage].stage_number}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-center"
                >
                  <h3 className="text-lg font-semibold text-[#e91919] mb-1">
                    {careerStages[currentStage].stage_title}
                  </h3>
                  <p className="text-sm text-[#e91919]/90 mb-2">
                    {careerStages[currentStage].goal}
                  </p>
                  <div className="flex justify-center flex-wrap gap-3 mt-4">
            {careerStages[currentStage].skills.slice(0, 4).map((skill, idx) => (
             <div
              key={idx}
             className="bg-[#fff0f0] border border-[#f8d7da] rounded-xl px-4 py-2 shadow-sm text-[#b71c1c] text-sm font-medium transition hover:shadow-md"
             >
            {skill}
           </div>
    ))}
        </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <button
            onClick={goPrev}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#e91919] hover:bg-[#c21515] text-white p-2 rounded-full shadow transition disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#e91919] hover:bg-[#c21515] text-white p-2 rounded-full shadow transition disabled:opacity-50"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {careerStages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (isAnimating || idx === currentStage) return;
                  setDirection(idx > currentStage ? 1 : -1);
                  setIsAnimating(true);
                  setCurrentStage(idx);
                }}
                className={`w-3 h-3 rounded-full transition ${
                  currentStage === idx ? "bg-[#e91919]" : "bg-red-200"
                }`}
                aria-label={`Step ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* User Info Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-[#e91919] mb-3 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile
            </h2>
            <p className="text-sm text-gray-800 mb-1">Username: {userInfo.username}</p>
            <p className="text-sm text-gray-800">Email: {userInfo.email}</p>
          </div>

          {/* Generate CV */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-[#e91919] mb-3">
              Build Your CV
            </h2>
            <Link
              to="/make"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#e91919] hover:bg-[#c21515] text-white font-medium rounded-3xl px-5 py-3 transition"
            >
              <FileText className="w-5 h-5" />
              Generate CV
            </Link>
          </div>

          {/* Settings */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-[#e91919] mb-3">Settings</h2>
            <Link
              to="/settings"
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#e91919] font-medium rounded-3xl px-5 py-3 transition"
            >
              <Settings className="w-5 h-5" />
              Update Settings
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
