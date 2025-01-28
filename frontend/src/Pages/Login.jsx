import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(false);

  const [recruiter, setReqruiter] = useState(false);
  const [candidate, setCandidate] = useState(true);

  const [recEmail, setRecEmail] = useState("");
  const [recPass, setRecPass] = useState("");

  const navigate = useNavigate();

  const HandleCandidateLogin = async () => {
    if (email === "" && password === "") {
      alert("Please check all the input boxes");
    } else if (email === "" || password === "") {
      alert("Please check your inputs");
    } else {
      const obj = {
        email,
        password,
      };

      try {
        await fetch(`http://localhost:5000/users/login`, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success == false) {
              alert(res.message);
            }
            if (res.success == true) {
              alert(res.message);
              navigate("/");
              localStorage.setItem("candidate", JSON.stringify(res.user[0]));
              localStorage.setItem("isAuthUser", true);
            }
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const HandleRecruiterLogin = async () => {
    if (recEmail === "" && recPass === "") {
      alert("Please check all the input boxes");
    } else if (recEmail === "" || recPass === "") {
      alert("Please check your inputs");
    } else {
      const obj = {
        email: recEmail,
        password: recPass,
      };

      try {
        await fetch(`http://localhost:5000/recruiters/login`, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success == false) {
              alert(res.message);
            }
            if (res.success == true) {
              alert(res.message);
              navigate("/");
              localStorage.setItem("recruiter", JSON.stringify(res.user[0]));
              localStorage.setItem("isAuth", true);
            }
            // console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <div className="register_container">
        <div className="can_rec_btn_div">
          <button
            onClick={() => {
              setCandidate(true);
              setReqruiter(false);
            }}
            className={candidate ? "btn_bg_clr" : ""}
          >
            Candidate
          </button>
          <button
            onClick={() => {
              setCandidate(false);
              setReqruiter(true);
            }}
            className={recruiter ? "btn_bg_clr" : ""}
          >
            Recruiter
          </button>
        </div>
        <div>
          <div
            className={candidate ? "candidate_input" : "hide_inputs_rec_can"}
          >
            <div className="input_box_con">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="password_div_con">
                <input
                  type={hide ? "text" : "Password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={() => setHide(!hide)}>
                  {!hide ? "show" : "hide"}
                </span>
              </div>
              <button
                onClick={
                  candidate ? HandleCandidateLogin : HandleRecruiterLogin
                }
                className="submit_btn"
              >
                Candidate Login
              </button>
            </div>
          </div>
          <div className={recruiter ? "recruter_input" : "hide_inputs_rec_can"}>
            <div className="input_box_con">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setRecEmail(e.target.value)}
              />

              <div className="password_div_con">
                <input
                  type={hide ? "text" : "Password"}
                  placeholder="Password"
                  onChange={(e) => setRecPass(e.target.value)}
                />
                <span onClick={() => setHide(!hide)}>
                  {!hide ? "show" : "hide"}
                </span>
              </div>

              <button
                onClick={
                  recruiter ? HandleRecruiterLogin : HandleCandidateLogin
                }
                className="submit_btn"
              >
                Recruiter Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
