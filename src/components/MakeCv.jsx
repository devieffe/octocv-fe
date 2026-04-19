import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, ArrowRight, Upload, Download } from "lucide-react";

const steps = [
  { title: "Choose Career Path", description: "Select your dream job from our extensive list of career paths." },
  { title: "Upload Your CV", description: "Upload your existing CV in PDF or DOCX format." },
  { title: "Get Enhanced CV", description: "We enhance and tailor your CV to fit the job perfectly." },
  { title: "Download & Apply", description: "Download your polished CV and start applying confidently!" },
];

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

const selectCls = "w-full bg-slate-800 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 transition";
const labelCls = "block text-xs font-medium text-gray-400 mb-1.5";

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
      } catch { setError("Failed to load career paths."); }
    };
    const fetchLanguages = async () => {
      try {
        const response = await axiosInstance.get("/api/languages/");
        setLanguages(response.data);
      } catch { setError("Failed to load languages."); }
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
      if (!ALLOWED_TYPES.includes(selected.type)) { setError("Invalid file type. Only PDF and DOC/DOCX allowed."); setFile(null); return; }
      if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) { setError("File size exceeds 2MB limit."); setFile(null); return; }
      setError("");
      setFile(selected);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) { setError("Please select a file."); return; }
    if (!selectedCareerPath) { setError("Please select a career path."); return; }
    if (!selectedLanguage) { setError("Please select a language."); return; }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_title", selectedCareerPath);
    formData.append("language", selectedLanguage);
    setError(""); setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/upload-cv/", formData);
      setDownloadUrl(response.data.url);
    } catch (err) {
      setError(err.response?.data?.error ? `${err.response.data.error}` : "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goPrev = () => setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  const goNext = () => setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));

  return (
    <div className="bg-slate-950 px-6 py-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-black text-white">CV Builder</h1>

      {/* How It Works Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative bg-slate-900 border border-white/5 rounded-2xl p-8 flex flex-col items-center"
        style={{ minHeight: "220px" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-red-400" />
          </div>
          <h3 className="text-base font-bold text-white">How It Works</h3>
        </div>
        <div className="text-center max-w-xl">
          <h4 className="text-lg font-bold text-white mb-2">{steps[currentStep].title}</h4>
          <p className="text-gray-400 text-sm leading-relaxed">{steps[currentStep].description}</p>
        </div>

        <button onClick={goPrev} aria-label="Previous step"
          className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button onClick={goNext} aria-label="Next step"
          className="absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition">
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex gap-1.5 mt-6">
          {steps.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentStep(idx)} type="button"
              className={`h-1.5 rounded-full transition-all ${currentStep === idx ? "w-6 bg-red-500" : "w-1.5 bg-white/20"}`}
              aria-label={`Step ${idx + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Upload Form */}
      <motion.section
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-slate-900 border border-white/5 rounded-2xl p-8"
      >
        <h2 className="text-xl font-bold text-white mb-6">Create Your Dream CV</h2>

        <form className="space-y-5" onSubmit={handleUpload}>
          <div>
            <label htmlFor="careerPath" className={labelCls}>Career Path</label>
            <select id="careerPath" value={selectedCareerPath} onChange={handleCareerPathChange} required className={selectCls}>
              <option value="" disabled>Select a Career Path</option>
              {careerPaths.map(({ job_title, course_title }) => (
                <option key={job_title} value={job_title}>{job_title} — {course_title}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="language" className={labelCls}>CV Language</label>
            <select id="language" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} required className={selectCls}>
              <option value="" disabled>Select a Language</option>
              {languages.map((lang) => (
                <option key={lang.language} value={lang.language}>{lang.language_self_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cvUpload" className={labelCls}>Upload Your CV</label>
            <input
              type="file" id="cvUpload" accept=".pdf,.doc,.docx" onChange={handleFileChange}
              className="w-full text-sm text-gray-400 file:mr-4 file:rounded-xl file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-white file:text-sm file:font-semibold hover:file:bg-red-500 file:transition-colors cursor-pointer"
            />
            {file && <p className="text-xs text-gray-500 mt-1.5">{file.name} ({(file.size / 1024).toFixed(0)} KB)</p>}
          </div>

          {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}

          <button
            type="submit" disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>Processing... <span className="animate-spin border-2 border-white/30 border-t-white rounded-full w-4 h-4" /></>
            ) : (
              <><Upload className="w-4 h-4" /> Upload & Enhance CV</>
            )}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-400 font-semibold rounded-xl py-3 text-sm transition-colors"
            >
              <Download className="w-4 h-4" /> Download Your Enhanced CV
            </a>
          )}
        </form>
      </motion.section>
    </div>
  );
};

export default MakeCv;
