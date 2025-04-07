import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PostJob from "../Pages/PostJob";
import UserJobs from "../Pages/UserJobs";
import PrivateRote from "./PrivateRote";
import PrivateRoutUser from "./PrivateRoutUser";
import AppliedJobListPage from "../Pages/AppliedJobListPage";
import BuildResume from "../Pages/BuildResume";
import RecruiterJobApplications from "../Pages/RecruiterJobApplications";
import RecruiterApplications from "../Pages/RecruiterApplications";



export default function AllRouters() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/jobpost"
        element={
          <PrivateRote>
            <PostJob />
          </PrivateRote>
        }
      />
      <Route
        path="/jobapply"
        element={
          <PrivateRoutUser>
            <UserJobs />
          </PrivateRoutUser>
        }
      />
      
      <Route
        path="/appliedjoblist"
        element={
          <PrivateRoutUser>
            <AppliedJobListPage />
          </PrivateRoutUser>
        }
      />
      <Route path="/build-resume" element={<BuildResume />} />
      <Route
        path="/job/:jobId/applications"
        element={<RecruiterJobApplications />}
      />
      <Route path="/recruiter/applications" element={<RecruiterApplications />} />
     


      
    </Routes>
  );
}
