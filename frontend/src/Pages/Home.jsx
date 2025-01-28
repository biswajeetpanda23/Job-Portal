import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let isAuthUser = localStorage.getItem("isAuthUser");
  let isAuthRecruiter = localStorage.getItem("isAuth");

  const navigate = useNavigate();

  const RecruterJobPage = () => {
    navigate("/jobpost");
  };
  return (
    <>
      <div className="main_container">
        <div className="container_background_div">
          <div className="shape_1"></div>
          <div className="shape_2"></div>

          <div className="shape_4_container">
            <div className="shape_3"></div>
            <div className="shape_3"></div>
            <div className="shape_3"></div>
            <div className="shape_3"></div>
          </div>
        </div>
      </div>
      <div className="container_2">
        <div className="heading_div">
          <h1>India’s Largest Job Portal.</h1>
          <p></p>
        </div>
        <div className="image_hire_div">
          <img
            src="https://quantumhunts.com/user/assets/images/hero/hiring-team.png"
            alt=""
          />
          <img
            src="https://img.freepik.com/premium-vector/isometric-hr-manager-business-recruiting-manager-reviews-resume-options-site_130740-813.jpg?w=1800"
            alt=""
          />
        </div>
        <div>
          <h1>⬇</h1>
        </div>
        <div>
          {isAuthRecruiter && (
            <button className="apply_Job_btn" onClick={RecruterJobPage}>
              Hire Candidates
            </button>
          )}
          {isAuthUser && (
            <button
              className="apply_Job_btn"
              onClick={() => navigate("/jobapply")}
            >
              Apply Job
            </button>
          )}
        </div>
        <h1 className="only_3_steps">
          Only &nbsp;<b style={{ color: "blue" }}> 3 </b>&nbsp; easy steps{" "}
        </h1>
        <div className="process_container">
          <div>
            <img
              src="https://d383au3bye3rv1.cloudfront.net/static/images/optimized/feature_icon_2.png"
              alt=""
            />
            <h4>STEP 1: COMPLETE PROFILE</h4>
            <p>
              Once you are approved, we showcase you to leading Indian
              technology startups
            </p>
          </div>
          <div>
            <img
              src="https://d383au3bye3rv1.cloudfront.net/static/images/optimized/icon1.png"
              alt=""
            />
            <h4>STEP 2: RECEIVE JOB OFFERS</h4>
            <p>
              Companies start sending interview requests. Talk to only the ones
              you like.
            </p>
          </div>
          <div>
            <img
              src="https://d383au3bye3rv1.cloudfront.net/static/images/optimized/icon2.png"
              alt=""
            />
            <h4>STEP 3: ACCEPT DREAM JOB</h4>
            <p>Compare your offers and accept the best one. Hired!</p>
          </div>
        </div>
      </div>
    </>
  );
}
