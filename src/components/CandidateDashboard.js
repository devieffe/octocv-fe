import React, { useState } from 'react';

const CandidateDashboard = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

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
      <h2>Candidate Dashboard</h2>
      <p>Now let's make an assessment to test your cognitive ability as well as your computer literacy skills.</p>
      <h2>Career Path</h2>
      <p>Personalized career path on this step you need to.</p>

      <input type="file" onChange={handleFileChange} />
      <button className="btn btn-dark" onClick={handleUpload}>Upload CV</button>
    </div>
  );
};

export default CandidateDashboard;
