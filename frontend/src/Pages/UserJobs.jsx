import React, { useEffect, useState } from "react";
import "../styles/UserJobs.css";

export default function UserJobs() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");

  const [PerticularData, setPerticularData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("candidate"));

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const getData = async () => {
    await fetch(`http://localhost:5000/jobs/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.loginToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setFilteredData(res); // Initialize filteredData with all jobs
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  // Function to filter jobs based on user selection
  useEffect(() => {
    let filtered = data;

    if (locationFilter) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    if (salaryFilter) {
      filtered = filtered.filter((job) => job.salary >= parseInt(salaryFilter));
    }
    if (jobTypeFilter) {
      filtered = filtered.filter((job) =>
        job.position.toLowerCase().includes(jobTypeFilter.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [locationFilter, salaryFilter, jobTypeFilter, data]);

  const getPerticularJob = async (id) => {
    handleModalOpen();
    await fetch(`http://localhost:5000/jobs/perticular/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.loginToken,
      },
    })
      .then((res) => res.json())
      .then((res) => setPerticularData(res[0]))
      .catch((err) => console.log(err));
  };

  const applyJobFunc = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/jobs/perticular/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: user.loginToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch job data.");
      }

      const jobData = await response.json();
      let obj = {
        jobData: jobData[0],
      };

      const postResponse = await fetch(`http://localhost:5000/jobsapply/add`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Authorization: user.loginToken,
        },
      });

      if (!postResponse.ok) {
        throw new Error("Failed to post job data.");
      }

      const postResult = await postResponse.json();
      console.log(postResult);
      alert("Job Applied Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // Save Job Function
  const saveJobFunc = async (jobId) => {
    const user = JSON.parse(localStorage.getItem("candidate")); // Get the logged-in user
  
    try {
      const response = await fetch("http://localhost:5000/user/saveJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.loginToken}`, // Ensure the Authorization token is set
        },
        body: JSON.stringify({
          userId: user._id,  // Use the user ID from local storage
          jobId: jobId,      // The job ID to be saved
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save job");
      }
  
      const result = await response.json();
      if (result.success) {
        alert("Job saved successfully!");
      } else {
        alert(result.message || "Error saving job");
      }
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Error saving job: " + error.message);
    }
  };
  
  

  return (
    <div className="job-container">
      {/* Filter Section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Filter by location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum Salary (LPA)"
          value={salaryFilter}
          onChange={(e) => setSalaryFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Job Type"
          value={jobTypeFilter}
          onChange={(e) => setJobTypeFilter(e.target.value)}
        />
      </div>

      {/* Job Listing */}
      <div className="job-list-container">
        {filteredData.length > 0 ? (
          filteredData.map((ele) => (
            <div key={ele._id} className="job-item">
              <h1>{ele.title}</h1>
              <h4>{ele.position}</h4>
              <p>Company: {ele.company}</p>
              <p>Salary: {ele.salary} LPA</p>
              <p>Job Location: {ele.location}</p>
              <button onClick={() => getPerticularJob(ele._id)}>
                View job description
              </button>
              <button onClick={() => applyJobFunc(ele._id)}>Apply</button>
            </div>
          ))
        ) : (
          <h1>No Jobs Found</h1>
        )}
      </div>

      {/* Modal for Job Details */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close-btn" onClick={handleModalClose}>
              &times;
            </button>
            <h2>Job Details</h2>
            <div key={PerticularData._id} className="job-item">
              <h1>{PerticularData.title}</h1>
              <h4>{PerticularData.position}</h4>
              <p>Company Name: {PerticularData.company}</p>
              <p>{PerticularData.description}</p>
              <p>{PerticularData.responsibilities}</p>
              <p>Salary: {PerticularData.salary} LPA</p>
              <p>Job Location: {PerticularData.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
