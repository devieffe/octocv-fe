import React, { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";

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
        console.log("Access token:", localStorage.getItem("access_token"));
        const response = await axiosInstance.get("/api/career/");
        setCareerPaths(response.data);
      } catch (error) {
        console.error("Failed to fetch career paths:", error);
        setError("Failed to load career paths. Please try again later.");
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
        setError("Invalid file type. Only PDF and DOCX files are allowed.");
        setFile(null);
        return;
      }

      if (!isValidSize) {
        setError("File size exceeds 2MB limit.");
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
      setError("Please select a valid file first.");
      return;
    }

    if (!selectedCareerPath) {
      setError("Please select a career path.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_title", selectedCareerPath);

    setError("");
    setIsLoading(true);

    try {

      console.log("Uploading:", {
        file,
        job_title: selectedCareerPath
      });
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("job_title", selectedCareerPath);
      
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      };
      
      const response = await axiosInstance.post("/api/upload-cv/", formData);
      setDownloadUrl(response.data.url);
    } catch (err) {
      console.error("Upload error:", err);
      console.log("Response:", err?.response);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Server error. Please try again.");
      }
    }
    
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-white px-6 py-12 lg:px-8">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-blue-950">
            Create Your New CV
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Select your career path and upload your current CV. We’ll enhance it for your future!
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleUpload}>
          <div>
            <label htmlFor="careerPath" className="block text-sm font-medium text-blue-950">
              Career Path
            </label>
            <select
              id="careerPath"
              name="careerPath"
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
          </div>

          <div>
            <label htmlFor="cvUpload" className="block text-sm font-medium text-blue-950">
              Upload Your CV (PDF or DOCX)
            </label>
            <input
              type="file"
              id="cvUpload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-red-600 file:px-3 file:py-2 file:text-white hover:file:bg-red-500"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
          >
            {isLoading ? "Uploading..." : "Upload CV"}
          </button>

          {isLoading && (
            <p className="text-sm text-gray-700 flex items-center gap-2 mt-2">
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-red-600" />
              Processing your CV... This may take up to a minute.
            </p>
          )}

          {downloadUrl && (
            <p className="text-sm mt-4 text-green-700">
              ✅ Your enhanced CV is ready:{" "}
              <a
                href={downloadUrl}
                className="underline text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here to download
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default MakeCv;
