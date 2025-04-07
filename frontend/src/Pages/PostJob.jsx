
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../styles/Postjob.css";

export default function PostJob() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState(""); // Fixed typo
  const [category, setCategory] = useState(""); // Fixed typo

  // Edit Job States
  const [editingJob, setEditingJob] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const GetUser = JSON.parse(localStorage.getItem("recruiter"));
  const token = GetUser.loginToken;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("recruiter"));

  // Fetch Jobs
  const getData = async () => {
    setLoading(true);
    await fetch(`http://localhost:5000/jobs/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.loginToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // Add Job
  const JobAddFunc = async () => {
    const jobData = {
      title,
      position,
      salary,
      description,
      responsibilities, // Corrected key
      location,
      company: GetUser.company,
      category, // Corrected key
    };

    try {
      await fetch(`http://localhost:5000/jobs/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(jobData),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            alert(res.message);
            setIsModalOpen(false);
            getData();
          } else {
            alert(res.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Job
  const deletefunc = async (id) => {
    await fetch(`http://localhost:5000/jobs/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.loginToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        getData();
      });
  };

  // Edit Job
  const handleEditJob = async (id, updatedJob) => {
    try {
      await fetch(`http://localhost:5000/jobs/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updatedJob),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            alert(res.message);
            setIsEditModalOpen(false);
            getData();
          } else {
            alert(res.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Edit Job Modal Component
  const EditJobModal = ({ job, onClose, onSave }) => {
    const [editedTitle, setEditedTitle] = useState(job.title);
    const [editedPosition, setEditedPosition] = useState(job.position);
    const [editedSalary, setEditedSalary] = useState(job.salary);
    const [editedLocation, setEditedLocation] = useState(job.location);
    const [editedDescription, setEditedDescription] = useState(job.description);
    const [editedResponsibilities, setEditedResponsibilities] = useState(job.responsibilities);
    const [editedCategory, setEditedCategory] = useState(job.category);

    const handleSave = () => {
      const updatedJob = {
        title: editedTitle,
        position: editedPosition,
        salary: editedSalary,
        location: editedLocation,
        description: editedDescription,
        responsibilities: editedResponsibilities,
        category: editedCategory,
      };
      onSave(job._id, updatedJob);
    };

    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
          <h2>Edit Job</h2>
          <div className="modal_input_box_container">
            <select
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Software Engineers">Software Engineers</option>
              <option value="Product Managers">Product Managers</option>
              <option value="Data Scientists">Data Scientists</option>
              <option value="UI/UX Designers">UI/UX Designers</option>
              <option value="Cybersecurity Analysts">Cybersecurity Analysts</option>
              <option value="Cloud Engineers">Cloud Engineers</option>
              <option value="AI/ML Engineers">AI/ML Engineers</option>
              <option value="Marketing Managers">Marketing Managers</option>
              <option value="Finance Analysts">Finance Analysts</option>
              <option value="DevOps Engineers">DevOps Engineers</option>
              <option value="Mobile App Developers">Mobile App Developers</option>
              <option value="Blockchain Developers">Blockchain Developers</option>
              <option value="Game Developers">Game Developers</option>
              <option value="Embedded Systems Engineers">Embedded Systems Engineers</option>
              <option value="System Administrators">System Administrators</option>
              <option value="Full Stack Developers">Full Stack Developers</option>
              <option value="Backend Developers">Backend Developers</option>
              <option value="Frontend Developers">Frontend Developers</option>
              <option value="QA Engineers">QA Engineers</option>
              <option value="Technical Writers">Technical Writers</option>
            </select>
            <input
              type="text"
              placeholder="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Position"
              value={editedPosition}
              onChange={(e) => setEditedPosition(e.target.value)}
            />
            <input
              type="text"
              placeholder="Responsibilities"
              value={editedResponsibilities}
              onChange={(e) => setEditedResponsibilities(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={editedLocation}
              onChange={(e) => setEditedLocation(e.target.value)}
            />
            <input
              type="number"
              placeholder="Salary"
              value={editedSalary}
              onChange={(e) => setEditedSalary(e.target.value)}
            />
            <button onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      </div>
    );
  };

  // Render Jobs
  const JobData = () => {
    if (data.length > 0) {
      return (
        <div className="Jobs_Card_main_container">
          {data.map((ele) => (
            <div key={ele._id}>
              <h1>{ele.title}</h1>
              <h4>{ele.position}</h4>
              <p className="add_job_page_description">{ele.description}</p>
              <p>{ele.responsibilities}</p> {/* Now correctly rendered */}
              <p>{ele.salary} LPA</p>
              <p>{ele.location}</p>

              
              <button onClick={() => {
                setEditingJob(ele);
                setIsEditModalOpen(true);
              }}>
                Edit job
              </button>
              <button onClick={() => deletefunc(ele._id)}>Delete job</button>
             
            </div>
          ))}
        </div>
      );
    } else {
      return <h1>No jobs posted yet.</h1>;
    }
  };

  return (
    <div className="JobPostPage">
      <button onClick={() => setIsModalOpen(true)} className="AddJob_btn">
        Post Jobs
      </button>

      {/* Add Job Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2>Add New Job</h2>
            <div className="modal_input_box_container">
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Software Engineers">Software Engineers</option>
                <option value="Product Managers">Product Managers</option>
                <option value="Data Scientists">Data Scientists</option>
                <option value="UI/UX Designers">UI/UX Designers</option>
                <option value="Cybersecurity Analysts">Cybersecurity Analysts</option>
                <option value="Cloud Engineers">Cloud Engineers</option>
                <option value="AI/ML Engineers">AI/ML Engineers</option>
                <option value="Marketing Managers">Marketing Managers</option>
                <option value="Finance Analysts">Finance Analysts</option>
                <option value="DevOps Engineers">DevOps Engineers</option>
                <option value="Mobile App Developers">Mobile App Developers</option>
                <option value="Blockchain Developers">Blockchain Developers</option>
                <option value="Game Developers">Game Developers</option>
                <option value="Embedded Systems Engineers">Embedded Systems Engineers</option>
                <option value="System Administrators">System Administrators</option>
                <option value="Full Stack Developers">Full Stack Developers</option>
                <option value="Backend Developers">Backend Developers</option>
                <option value="Frontend Developers">Frontend Developers</option>
                <option value="QA Engineers">QA Engineers</option>
                <option value="Technical Writers">Technical Writers</option>
                <option value="Project Managers">Project Managers</option>
                <option value="Business Analysts">Business Analysts</option>
                <option value="HR Managers">HR Managers</option>
                <option value="Recruiters">Recruiters</option>
                <option value="Sales Managers">Sales Managers</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Operations Managers">Operations Managers</option>
                


              </select>
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Position"
                onChange={(e) => setPosition(e.target.value)}
              />
              <input
                type="text"
                placeholder="Responsibilities"
                onChange={(e) => setResponsibilities(e.target.value)}
              />
              <textarea
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="number"
                placeholder="Salary"
                onChange={(e) => setSalary(e.target.value)}
              />
              <button onClick={JobAddFunc}>Add Job</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {isEditModalOpen && (
        <EditJobModal
          job={editingJob}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditJob}
        />
      )}

      {/* Display Jobs */}
      {JobData()}
    </div>
  );
}