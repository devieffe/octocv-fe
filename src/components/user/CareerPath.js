import { useState } from "react";
import { motion } from "framer-motion";
import { careerPaths } from "../../assets/careerPaths";
import CareerStepCard from "./CareerStepCard";
import Sidebar from "./Sidebar";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const CareerPath = () => {
  const [selectedPath, setSelectedPath] = useState("Full Stack Developer");

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto bg-white">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-semibold text-blue-950">Career Path</h1>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {Object.keys(careerPaths).map((path, i) => (
            <motion.button
              key={path}
              custom={i + 1}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              onClick={() => setSelectedPath(path)}
              className={`px-4 py-2 rounded-full border font-medium transition hover:scale-105 ${
                path === selectedPath
                  ? "bg-[#e91919] text-white"
                  : "border-[#e91919] text-[#e91919]"
              }`}
            >
              {path}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerPaths[selectedPath].map((step, idx) => (
            <motion.div
              key={idx}
              custom={idx + 1}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="transition hover:scale-105"
            >
              <CareerStepCard step={step} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CareerPath;
