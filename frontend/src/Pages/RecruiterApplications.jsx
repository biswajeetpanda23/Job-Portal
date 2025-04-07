import React, { useEffect, useState } from "react";
import axios from "axios";

const RecruiterApplications = () => {
  const [applications, setApplications] = useState([]);
  
  // Get recruiter ID from local storage (Assuming recruiter logs in)
  const recruiter = JSON.parse(localStorage.getItem("recruiter"));
  const recruiterId = recruiter ? recruiter._id : null;
  const token = recruiter ? recruiter.loginToken : null;

  useEffect(() => {
    if (!recruiterId) {
      console.error("Recruiter ID not found.");
      return;
    }

    // Fetch applied candidates for the recruiter's jobs
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recruiter/${recruiterId}/applications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [recruiterId, token]);

  return (
    <div>
      <h1>Applied Candidates</h1>
      {applications.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Job Title</th>
              <th>Application Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(application => (
              <tr key={application._id}>
                <td>{application.user.name}</td>
                <td>{application.user.email}</td>
                <td>{application.user.phone || "N/A"}</td>
                <td>{application.job.title}</td>
                <td>{new Date(application.appliedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates have applied yet.</p>
      )}
    </div>
  );
};

export default RecruiterApplications;
