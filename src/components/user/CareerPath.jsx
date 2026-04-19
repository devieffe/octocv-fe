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
        setError("❌ Could not load career paths.");
      }
    };
    fetchCareerPaths();
  }, []);

  useEffect(() => {
    const fetchCareerMap = async () => {
      if (!selectedPath) return;
      try {
        const response = await axiosInstance.post("/api/career-map/", {
          job_title: selectedPath,
        });
        setCareerSteps(response.data);
      } catch {
        setError("❌ Failed to load career map data.");
      }
    };
    fetchCareerMap();
  }, [selectedPath]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-[#e91919] mb-10 select-none drop-shadow-sm">
          Career Path
        </h1>

        <section className="flex flex-wrap gap-4 mb-10">
          {careerTitles.map((title, i) => (
            <motion.button
              key={title}
              custom={i + 1}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.1, duration: 0.4 },
                },
              }}
              onClick={() => setSelectedPath(title)}
              className={`px-6 py-3 rounded-full text-sm font-semibold shadow-sm transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#e91919] focus:ring-offset-2 ${
                title === selectedPath
                  ? "bg-[#e91919] text-white"
                  : "border border-[#e91919] text-[#e91919] bg-white"
              }`}
            >
              {title}
            </motion.button>
          ))}
        </section>

        {error && <p className="text-red-600 mb-6 text-center text-lg">{error}</p>}

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {careerSteps.map((step, idx) => (
            <CareerStepCard
              key={idx}
              step={step}
              index={idx}
              onClick={() => setSelectedStep(step)}
            />
          ))}
        </section>

        {selectedStep && (
          <CareerModal step={selectedStep} onClose={() => setSelectedStep(null)} />
        )}
      </main>
    </div>
  );
};

export default CareerPath;
