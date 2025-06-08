import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import CareerStepCard from "./CareerStepCard";
import CareerModal from "./CareerModal";
import Sidebar from "./Sidebar";

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
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-blue-950 mb-8">Career Path</h1>

        <div className="flex flex-wrap gap-3 mb-6">
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
              className={`px-4 py-2 rounded-full border font-medium transition hover:scale-105 ${
                title === selectedPath
                  ? "bg-[#e91919] text-white"
                  : "border-[#e91919] text-[#e91919]"
              }`}
            >
              {title}
            </motion.button>
          ))}
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerSteps.map((step, idx) => (
            <CareerStepCard
              key={idx}
              step={step}
              index={idx}
              onClick={() => setSelectedStep(step)}
            />
          ))}
        </div>

        {selectedStep && (
          <CareerModal step={selectedStep} onClose={() => setSelectedStep(null)} />
        )}
      </main>
    </div>
  );
};

export default CareerPath;
