import React, { useEffect, useState } from "react";

const RecruiterApplications = () => {
  const [applications, setApplications] = useState([]);
  const recruiterId = JSON.parse(localStorage.getItem("recruiter"))._id;
  const token = JSON.parse(localStorage.getItem("recruiter")).loginToken;

  // Fetch job applications for the recruiter
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`http://localhost:5000/jobs/applications/${recruiterId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [recruiterId, token]);

  return (
    <div>
      <h1>Recruiter Applications</h1>
      <div>
        {applications.length > 0 ? (
          applications.map((application) => (
            <div key={application._id}>
              <h3>{application.candidateName}</h3>
              <p>{application.jobTitle}</p>
              <p>{application.status}</p>
              {/* Add more details about the application */}
            </div>
          ))
        ) : (
          <p>No applications yet.</p>
        )}
      </div>
    </div>
  );
};

export default RecruiterApplications;
