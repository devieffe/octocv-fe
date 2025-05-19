import React, { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";
import Sidebar from "../components/user/Sidebar";
import { motion } from "framer-motion";

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MakeCv = () => {
  const [careerPaths, setCareerPaths] = useState([]);
  const [selectedCareerPath, setSelectedCareerPath] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        const response = await axiosInstance.get("/api/career/");
        setCareerPaths(response.data);
      } catch (error) {
        setError("⚠️ Failed to load career paths. Please try again later.");
      }
    };

    fetchCareerPaths();

    const savedPath = localStorage.getItem("selectedCareerPath");
    if (savedPath) {
      setSelectedCareerPath(savedPath);
    }
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
        setError("🚫 Invalid file type. Only PDF and DOCX are allowed.");
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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_title", selectedCareerPath);

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

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      
        <Sidebar />
    

      {/* Main Content */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 px-6 py-12 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-blue-950">
               Create Your Dream CV
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Choose a career path, upload your CV, and let us do the magic 🪄
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleUpload}>
            {/* Career Path Selector */}
            <motion.div whileHover={{ scale: 1.02 }} className="transition-transform duration-200">
              <label htmlFor="careerPath" className="block text-sm font-medium text-blue-950">
                Career Path
              </label>
              <select
                id="careerPath"
                value={selectedCareerPath}
                onChange={handleCareerPathChange}
                required
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-blue-950 focus:outline-2 focus:outline-red-600 sm:text-sm"
              >
                <option value="" disabled>Select a Career Path</option>
                {careerPaths.map(({ job_title, course_title }) => (
                  <option key={job_title} value={job_title}>
                    {job_title} - {course_title}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* File Upload */}
            <motion.div whileHover={{ scale: 1.02 }} className="transition-transform duration-200">
              <label htmlFor="cvUpload" className="block text-sm font-medium text-blue-950">
                Upload Your CV
              </label>
              <input
                type="file"
                id="cvUpload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-red-600 file:px-3 file:py-2 file:text-white hover:file:bg-red-500"
              />
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm">
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
            >
              {isLoading ? "Uploading..." : " Upload CV"}
            </motion.button>

            {/* Loading Message */}
            {isLoading && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-700 flex items-center gap-2 mt-2"
              >
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-red-600" />
                Hang tight! Enhancing your CV...
              </motion.p>
            )}

            {/* Download Link */}
            {downloadUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm mt-4 text-green-700"
              >
                ✅ Done! Your new CV is ready:{" "}
                <a
                  href={downloadUrl}
                  className="underline text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Now
                </a>
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default MakeCv;
