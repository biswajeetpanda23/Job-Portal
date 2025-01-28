import React, { useEffect, useState } from "react";
import "../styles/UserJobs.css";

export default function UserJobs() {
  const [data, setData] = useState([]);

  const [apliedData, setAppliedData] = useState([]);
  console.log({ apliedData });

  const [targetData, setTargetData] = useState({});

  const [PerticularData, setPerticularData] = useState({});
  console.log(targetData);

  const user = JSON.parse(localStorage.getItem("candidate"));

  const [isModalOpen, setIsModalOpen] = useState(false); // New state to handle modal open/close

  // Function to handle opening the modal
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataForCheck = async () => {
    await fetch(`http://localhost:5000/jobsapply/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.loginToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAppliedData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    getDataForCheck();
  }, []);

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
      .then((res) => {
        setPerticularData(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const applyJobFunc = async (id) => {
    try {
      // Fetch particular job data using the provided id
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
      // Parse the response data to JSON
      const jobData = await response.json();
      // Set the fetched job data in the state (assuming you have a state hook named 'targetData')
      setTargetData(jobData[0]);
      // Create an object containing the jobData for the POST request
      let obj = {
        jobData: jobData[0],
      };
      // Send a POST request with the jobData to the '/jobsapply/add' route
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
      // Parse the POST response to JSON if needed (you can do something with the response if required)
      const postResult = await postResponse.json();
      console.log(postResult);
      alert("Job Applied Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const JobData = () => {
    if (data.length > 0) {
      return (
        <div className="job-list-container">
          {data.map((ele) => (
            <div key={ele._id} className="job-item">
              <h1>{ele.title}</h1>
              <h4>{ele.position}</h4>
              <p>Company: {ele.company}</p>
              <p>Salary : {ele.salary} LPA</p>
              <p>Job Location : {ele.location}</p>
              <button onClick={() => getPerticularJob(ele._id)}>
                View job description
              </button>
              <button onClick={() => applyJobFunc(ele._id)}>Apply</button>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h1>Data not found</h1>
        </div>
      );
    }
  };

  return (
    <div>
      {JobData()}
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
              <p>Salary : {PerticularData.salary} LPA</p>
              <p>Job Location : {PerticularData.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
