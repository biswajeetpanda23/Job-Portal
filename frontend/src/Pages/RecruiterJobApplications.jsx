import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecruiterJobApplications = () => {
  const { jobId } = useParams(); // Get jobId from URL
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch applications for the job post
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`/api/jobapplications/${jobId}`);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [jobId]); // re-run the effect when jobId changes

  return (
    <div>
      <h1>Applications for Job {jobId}</h1>
      <ul>
        {applications.map((application) => (
          <li key={application._id}>
            <p><b>Candidate:</b> {application.userId.name}</p>
            <p><b>Email:</b> {application.userId.email}</p>
            <p><b>Applied At:</b> {new Date(application.appliedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecruiterJobApplications;
