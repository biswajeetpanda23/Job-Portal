import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const isAuth = localStorage.getItem("isAuth") || false;
  const isAuthUser = localStorage.getItem("isAuthUser") || false;

  const navigate = useNavigate();

  const handleJobpage = () => {
    navigate("/jobpost");
  };

  const handleHireCandidate = () => {
    navigate("/recruiter/applications");
  };

  const handleLogout = () => {
    const result = window.confirm("Are you sure you want to logout?");
    if (result) {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("isAuthUser");
      localStorage.removeItem("recruiter");
      localStorage.removeItem("candidate");

      navigate("/login");
      alert("Logout successful");
    }
  };

  const handleViewJobpage = () => {
    navigate("/jobapply");
  };

  const handleAppliedJobs = () => {
    navigate("/appliedjoblist");
  };

 

  const handleBuildResume = () => {
    navigate("/build-resume");
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/">Jobify</Link>
      </div>

      {isAuth && (
        <div>
          <button onClick={handleJobpage}>Job Post</button>
          <button onClick={handleHireCandidate}>Hire Candidate</button>
         

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {isAuthUser && (
        <div>
          <button onClick={handleViewJobpage}>View Jobs</button>
          <button onClick={handleAppliedJobs}>Applied Jobs</button>
          <button onClick={handleBuildResume}>Build Resume</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {!isAuth && !isAuthUser && (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}
