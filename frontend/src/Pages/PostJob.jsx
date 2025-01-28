import React, { useEffect, useState } from "react";
import "../styles/Postjob.css";

export default function PostJob() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [responsiblities, setResponsiblities] = useState("");
  const [catagory, setCatagory] = useState("");

  const GetUser = JSON.parse(localStorage.getItem("recruiter"));

  const token = GetUser.loginToken;

  const [isModalOpen, setIsModalOpen] = useState(false); // New state to handle modal open/close
  const user = JSON.parse(localStorage.getItem("recruiter"));

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
        console.log(res);
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

  // Function to handle opening the modal
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const JobAddFunc = async () => {
    let obj = {
      title,
      position,
      salary,
      description,
      responsiblities,
      location,
      company: GetUser.company,
      catagory,
    };
    console.log(obj);
    try {
      await fetch(`http://localhost:5000/jobs/add`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success == false) {
            alert(res.message);
          }
          if (res.success == true) {
            alert(res.message);
            setIsModalOpen(false);
            getData();
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const JobData = () => {
    if (data.length > 0) {
      return (
        <div className="Jobs_Card_main_container">
          {data &&
            data.map((ele) => (
              <div key={ele._id}>
                {" "}
                {/* Add a unique key prop for the map */}
                <h1>{ele.title}</h1>
                <h4>{ele.position}</h4>
                <p className="add_job_page_description">{ele.description}</p>
                <p>{ele.responsibilities}</p>{" "}
                {/* Correct spelling of responsibilities */}
                <p>{ele.salary} LPA</p>
                <p>{ele.location}</p>
                <button>Edit job</button>
                <button onClick={() => deletefunc(ele._id)}>Delete job</button>
              </div>
            ))}
        </div>
      );
    } else {
      return (
        <div>
          <h1>Jobs is not posted yet.</h1>
        </div>
      );
    }
  };

  return (
    <div className="JobPostPage">
      <button onClick={handleModalOpen} className="AddJob_btn">
        Post Jobs
      </button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close-btn" onClick={handleModalClose}>
              &times;
            </button>
            <h2>Add New Job</h2>
            {/* Add a form here to enter job details */}
            <div className="modal_input_box_container">
              <select
                name=""
                id=""
                onChange={(e) => setCatagory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Software engineers">Software engineers</option>
                <option value="Product Managers">Product Managers</option>
                <option value="Data Scientist"> Data Scientist</option>
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
                onChange={(e) => setResponsiblities(e.target.value)}
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
              <button onClick={JobAddFunc}>Add</button>
            </div>
          </div>
        </div>
      )}
      {JobData()}
    </div>
  );
}
