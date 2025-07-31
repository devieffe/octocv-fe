import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Choose Career Path",
    description: "Select your dream job from our extensive list of career paths.",
  },
  {
    title: "Upload Your CV",
    description: "Upload your existing CV in PDF or DOCX format.",
  },
  {
    title: "Get Enhanced CV",
    description: "We enhance and tailor your CV to fit the job perfectly.",
  },
  {
    title: "Download & Apply",
    description: "Download your polished CV and start applying confidently!",
  },
];

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword", // Added .doc mime type for safety
];

const MakeCv = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [careerPaths, setCareerPaths] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedCareerPath, setSelectedCareerPath] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        const response = await axiosInstance.get("/api/career/");
        setCareerPaths(response.data);
      } catch {
        setError("⚠️ Failed to load career paths. Please try again later.");
      }
    };

    const fetchLanguages = async () => {
      try {
        const response = await axiosInstance.get("/api/languages/");
        setLanguages(response.data);
      } catch {
        setError("⚠️ Failed to load languages. Please try again later.");
      }
    };

    fetchCareerPaths();
    fetchLanguages();

    const savedPath = localStorage.getItem("selectedCareerPath");
    if (savedPath) setSelectedCareerPath(savedPath);
  }, []);

  const handleCareerPathChange = (e) => {
    const value = e.target.value;
    setSelectedCareerPath(value);
    localStorage.setItem("selectedCareerPath", value);
  };

  const handleFileChange = (event) => {
    const selected = event.target.files[0];

    if (selected) {
      const isValidType = ALLOWED_TYPES.includes(selected.type);
      const isValidSize = selected.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

      if (!isValidType) {
        setError("🚫 Invalid file type. Only PDF and DOC/DOCX are allowed.");
        setFile(null);
        return;
      }

      if (!isValidSize) {
        setError("🚫 File size exceeds 2MB limit.");
        setFile(null);
        return;
      }

      setError("");
      setFile(selected);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("📎 Please select a file.");
      return;
    }

    if (!selectedCareerPath) {
      setError("🧭 Please select a career path.");
      return;
    }

    if (!selectedLanguage) {
      setError("🌍 Please select a language.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_title", selectedCareerPath);
    formData.append("language", selectedLanguage);

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/api/upload-cv/", formData);
      setDownloadUrl(response.data.url);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(`⚠️ ${err.response.data.error}`);
      } else {
        setError("⚠️ Something went wrong. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goPrev = () => {
    setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 gap-4 ">
      {/* How It Works Carousel Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-m p-10 md:p-12 relative flex flex-col items-center"
        style={{ minHeight: "280px" }}
      >
        <div className="flex items-center space-x-5 mb-8">
          <div className="bg-[#e91919] rounded-full p-5 shadow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-4xl font-semibold text-[#e91919] select-none">How It Works</h3>
        </div>

        <div className="text-center max-w-2xl">
          <h4 className="text-2xl font-bold text-[#b71c1c] mb-3">{steps[currentStep].title}</h4>
          <p className="text-[#b71c1c]/90 text-lg leading-relaxed">{steps[currentStep].description}</p>
        </div>

        {/* Carousel controls */}
        <button
          onClick={goPrev}
          aria-label="Previous step"
          className="absolute top-1/2 left-8 transform -translate-y-1/2 rounded-full bg-[#e91919] hover:bg-[#c21515] p-3 shadow-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#e91919]"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goNext}
          aria-label="Next step"
          className="absolute top-1/2 right-8 transform -translate-y-1/2 rounded-full bg-[#e91919] hover:bg-[#c21515] p-3 shadow-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#e91919]"
        >
          <ArrowRight className="w-6 h-6" />
        </button>

        <div className="flex space-x-3 mt-8">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              aria-label={`Step ${idx + 1}`}
              className={`w-4 h-4 rounded-full transition-colors ${
                currentStep === idx ? "bg-[#e91919]" : "bg-red-300"
              }`}
              type="button"
            />
          ))}
        </div>
      </motion.div>

      {/* CV Upload Form Card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-10 md:p-14 w-full max-w-4xl flex flex-col justify-between"
        style={{ minHeight: "480px" }}
      >
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-[#e91919] mb-10 select-none">
            Create Your Dream CV
          </h2>

          <form className="space-y-8" onSubmit={handleUpload}>
            {/* Career Path Select */}
            <label
              htmlFor="careerPath"
              className="block text-sm font-semibold text-[#b71c1c]"
            >
              Career Path
            </label>
            <select
              id="careerPath"
              value={selectedCareerPath}
              onChange={handleCareerPathChange}
              required
              className="mt-2 block w-full rounded-2xl border border-[#e91919]/50 px-5 py-4 text-[#b71c1c] focus:outline-none focus:ring-2 focus:ring-[#e91919] focus:border-transparent sm:text-base transition"
            >
              <option value="" disabled>
                Select a Career Path
              </option>
              {careerPaths.map(({ job_title, course_title }) => (
                <option key={job_title} value={job_title}>
                  {job_title} - {course_title}
                </option>
              ))}
            </select>

            {/* Language Select */}
            <label
              htmlFor="language"
              className="block text-sm font-semibold text-[#b71c1c] mt-8"
            >
              CV Language
            </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              required
              className="mt-2 block w-full rounded-2xl border border-[#e91919]/50 px-5 py-4 text-[#b71c1c] focus:outline-none focus:ring-2 focus:ring-[#e91919] focus:border-transparent sm:text-base transition"
            >
              <option value="" disabled>
                Select a Language
              </option>
              {languages.map((lang) => (
                <option key={lang.language} value={lang.language}>
                  {lang.language_self_name}
                </option>
              ))}
            </select>

            {/* File Upload */}
            <label
              htmlFor="cvUpload"
              className="block text-sm font-semibold text-[#b71c1c] mt-8"
            >
              Upload Your CV
            </label>
            <input
              type="file"
              id="cvUpload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-700
                file:mr-4 file:rounded-2xl file:border-0 file:bg-[#e91919] file:px-6 file:py-4 file:text-white
                hover:file:bg-[#c21515]
                transition
                focus:outline-none focus:ring-2 focus:ring-[#e91919]"
            />

            {error && (
              <p
                className="text-red-600 text-sm mt-3 select-none"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-10 w-full rounded-2xl bg-[#e91919] px-8 py-4 text-white hover:bg-[#c21515] transition text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-[#e91919]/60 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Uploading..." : "Upload CV"}
            </button>

            {isLoading && (
              <p
                className="text-sm text-gray-700 flex items-center gap-2 mt-6 select-none"
                aria-live="polite"
              >
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-[#e91919]" />
                Hang tight! Enhancing your CV...
              </p>
            )}

            {downloadUrl && (
              <div className="mt-10 flex flex-col items-center select-none">
                <p className="text-green-700 font-medium mb-4">✅ Done! Your new CV is ready:</p>
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-2xl bg-[#e91919] px-8 py-4 text-white font-semibold hover:bg-[#c21515] transition text-lg focus:outline-none focus:ring-4 focus:ring-[#e91919]/60"
                  download
                >
                  Download CV
                </a>
              </div>
            )}
          </form>
        </div>
      </motion.section>
    </div>
  );
};

export default MakeCv;
