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
import BuildResume from "../Pages/BuildResume"; // Import your BuildResume component


export default function AllRouters() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/jobpost"
        element={
          <PrivateRote>
            <PostJob />
          </PrivateRote>
        }
      ></Route>
      <Route
        path="/jobapply"
        element={
          <PrivateRoutUser>
            <UserJobs />
          </PrivateRoutUser>
        }
      ></Route>
      <Route
        path="/appliedjoblist"
        element={
          <PrivateRoutUser>
            <AppliedJobListPage />
          </PrivateRoutUser>
        }
      ></Route>
            <Route path="/build-resume" element={<BuildResume />} /> {/* Add this */}

    </Routes>
    
  );
}
