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
  // State for selected career path
  const [selectedCareerPath, setSelectedCareerPath] = useState("");

  // State for selected file
  const [file, setFile] = useState(null);

  // Handle career path change
  const handleCareerPathChange = (e) => {
    setSelectedCareerPath(e.target.value);
  };

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
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
        alert("File uploaded successfully!");
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className='container text-center col-6 custom-container'>
      <h2>Create your new CV</h2>

      <h2>Career Path</h2>
      <p>Personalized career path — on this step, you need to choose your target path.</p>

      <select
        className="form-control mb-4"
        value={selectedCareerPath}
        onChange={handleCareerPathChange}
        required
      >
        <option value="" disabled>Select a Career Path</option>
        {careerPaths.map((path) => (
          <option key={path} value={path}>{path}</option>
        ))}
      </select>

      <h2>Upload your CV</h2>
      <p>PDF and DOCX files only</p>

      <input type="file" onChange={handleFileChange} />
      <button className="btn btn-dark mt-3" onClick={handleUpload}>Upload CV</button>
    </div>
  );
};

export default CandidateDashboard;
