import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import CareerStepCard from "./CareerStepCard";
import CareerModal from "./CareerModal";

const CareerPath = () => {
  const [careerTitles, setCareerTitles] = useState([]);
  const [selectedPath, setSelectedPath] = useState("");
  const [careerSteps, setCareerSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        const response = await axiosInstance.get("/api/career/");
        const paths = response.data.map((item) => item.job_title);
        setCareerTitles(paths);
        if (paths.length > 0) setSelectedPath(paths[0]);
      } catch {
        setError("Could not load career paths.");
      }
    };
    fetchCareerPaths();
  }, []);

  useEffect(() => {
    const fetchCareerMap = async () => {
      if (!selectedPath) return;
      try {
        const response = await axiosInstance.post("/api/career-map/", { job_title: selectedPath });
        setCareerSteps(response.data);
      } catch {
        setError("Failed to load career map data.");
      }
    };
    fetchCareerMap();
  }, [selectedPath]);

  return (
    <div className="bg-slate-950 px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black text-white mb-8">Career Path</h1>

      <section className="flex flex-wrap gap-3 mb-8">
        {careerTitles.map((title, i) => (
          <motion.button
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            onClick={() => setSelectedPath(title)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
              title === selectedPath
                ? "bg-red-600 border-red-600 text-white"
                : "border-white/10 text-gray-400 hover:text-white hover:border-white/25 bg-white/5"
            }`}
          >
            {title}
          </motion.button>
        ))}
      </section>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {careerSteps.map((step, idx) => (
          <CareerStepCard key={idx} step={step} index={idx} onClick={() => setSelectedStep(step)} />
        ))}
      </section>

      {selectedStep && <CareerModal step={selectedStep} onClose={() => setSelectedStep(null)} />}
    </div>
  );
};

export default CareerPath;
