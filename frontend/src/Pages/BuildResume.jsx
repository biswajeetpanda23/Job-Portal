// src/Pages/BuildResume.jsx

import React, { useState } from "react";
import jsPDF from "jspdf";
import "../styles/BuildResume.css"; // Separate styles for the resume builder

const BuildResume = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    experience: "",
    skills: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [formError, setFormError] = useState("");

  const generateResumePDF = () => {
    const { name, email, experience, skills } = userDetails;

    // Simple form validation
    if (!name || !email || !experience || !skills) {
      setFormError("Please fill all the fields before generating the resume.");
      return;
    }

    const doc = new jsPDF();
    doc.text(`Name: ${name}`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);
    doc.text(`Experience: ${experience}`, 10, 30);
    doc.text(`Skills: ${skills}`, 10, 40);
    doc.save("resume.pdf");
    setFormError(""); // Clear the error after PDF is generated
  };

  const uploadResume = async () => {
    if (!resumeFile) {
      setFileError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    // Replace with your upload logic
    alert("Resume uploaded successfully");
    setFileError(""); // Clear the error after upload
  };

  return (
    <div className="build-resume-modal-overlay">
      <div className="build-resume-modal">
        <button
          className="build-resume-modal-close-btn"
          onClick={() => window.history.back()}
        >
          &times;
        </button>
        <h2>Resume Builder</h2>

        {/* Display form errors */}
        {formError && <p className="form-error">{formError}</p>}

        <input
          type="text"
          placeholder="Name"
          value={userDetails.name}
          onChange={(e) =>
            setUserDetails({ ...userDetails, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
        />
        <textarea
          placeholder="Experience"
          value={userDetails.experience}
          onChange={(e) =>
            setUserDetails({ ...userDetails, experience: e.target.value })
          }
        />
        <textarea
          placeholder="Skills"
          value={userDetails.skills}
          onChange={(e) =>
            setUserDetails({ ...userDetails, skills: e.target.value })
          }
        />

        <button onClick={generateResumePDF}>Download PDF</button>

        {/* File Upload */}
        <input
          type="file"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />
        {fileError && <p className="file-error">{fileError}</p>}

        <button onClick={uploadResume}>Upload Resume</button>
      </div>
    </div>
  );
};

export default BuildResume;
