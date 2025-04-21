import React, { useState } from 'react';

const careerPaths = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UI/UX Designer",
  "Cybersecurity Specialist",
  "Marketing Specialist",
  "Business Analyst",
  "Other",
];

const CandidateDashboard = () => {
  const [selectedCareerPath, setSelectedCareerPath] = useState("");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleCareerPathChange = (e) => {
    setSelectedCareerPath(e.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/upload/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
      } else {
        setUploadStatus("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Upload error.");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-white px-6 py-12 lg:px-8">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-blue-950">Create Your New CV</h2>
          <p className="mt-2 text-sm text-gray-600">
            Let’s personalize your career journey — start by selecting your target path and uploading your existing CV.
          </p>
        </div>

        <form className="space-y-6">
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
              {careerPaths.map((path) => (
                <option key={path} value={path}>{path}</option>
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

          {uploadStatus && (
            <p className="text-sm text-center text-red-600">{uploadStatus}</p>
          )}

          <button
            type="button"
            onClick={handleUpload}
            className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-2 focus:outline-red-600"
          >
            Upload CV
          </button>
        </form>
      </div>
    </section>
  );
};

export default CandidateDashboard;
