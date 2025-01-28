import React, { useEffect, useState } from "react";
import "../styles/AppliedJobListPage.css";

export default function AppliedJobListPage() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("candidate"));
  console.log(data);

  const getData = async () => {
    await fetch(`http://localhost:5000/jobsapply/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.loginToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const DataRender = () => {
    if (data.length > 0) {
      return (
        <div className="job_applied_list">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ele) => (
                <tr key={ele._id}>
                  <td>{ele.jobData.title}</td>
                  <td>{ele.jobData.position}</td>
                  <td>{ele.jobData.salary} LPA</td>
                  <td>{ele.jobData.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="no_data_message">
          <h1>Not applied yet</h1>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>
        Total number of job applied : <b>{data.length}</b>
      </h2>
      {DataRender()}
    </div>
  );
}
