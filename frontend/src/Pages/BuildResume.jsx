// src/Pages/BuildResume.jsx

import React, { useState } from "react";
import jsPDF from "jspdf";
import "../styles/UserJobs.css"; // You can use the same styles
import "../styles/BuildResume.css";

const BuildResume = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    experience: "",
    skills: "",
  });

  const [resumeFile, setResumeFile] = useState(null);

  const generateResumePDF = () => {
    const doc = new jsPDF();
    const { name, email, experience, skills } = userDetails;
    doc.text(`Name: ${name}`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);
    doc.text(`Experience: ${experience}`, 10, 30);
    doc.text(`Skills: ${skills}`, 10, 40);
    doc.save("resume.pdf");
  };

  const uploadResume = async () => {
    const formData = new FormData();
    formData.append("resume", resumeFile);
    // Replace with your upload logic
    alert("Resume uploaded successfully");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-btn" onClick={() => window.history.back()}>
          &times;
        </button>
        <h2>Resume Builder</h2>
        <input
          type="text"
          placeholder="Name"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
        />
        <textarea
          placeholder="Experience"
          value={userDetails.experience}
          onChange={(e) => setUserDetails({ ...userDetails, experience: e.target.value })}
        />
        <textarea
          placeholder="Skills"
          value={userDetails.skills}
          onChange={(e) => setUserDetails({ ...userDetails, skills: e.target.value })}
        />
        <button onClick={generateResumePDF}>Download PDF</button>
        <input
          type="file"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />
        <button onClick={uploadResume}>Upload Resume</button>
      </div>
    </div>
  );
};

export default BuildResume;
