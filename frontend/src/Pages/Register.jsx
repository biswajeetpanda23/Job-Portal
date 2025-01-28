import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [hide, setHide] = useState(false);

  const [recruiter, setReqruiter] = useState(false);
  const [candidate, setCandidate] = useState(true);

  const [recName, setRecName] = useState("");
  const [recEmail, setRecEmail] = useState("");
  const [recPass, setRecPass] = useState("");
  const [recMobile, setRecMobile] = useState("");

  const [company, setCompany] = useState("");

  const navigate = useNavigate();

  const validatePassword = () => {
    const validLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*_-]/.test(password);

    return { validLength, hasUppercase, hasSpecialChar, hasDigit };
  };

  const renderRuleIndicator = (isValid) => {
    return isValid ? (
      <span
        className="ruleIndicator valid"
        id="greenTick"
        style={{ color: "green" }}
      >
        ✔
      </span>
    ) : (
      <span className="ruleIndicator" style={{ color: "red" }}>
        ✘
      </span>
    );
  };

  const renderPasswordRules = () => {
    const passwordRules = validatePassword(password);

    return (
      <div id="passwordRules">
        <p>
          {renderRuleIndicator(passwordRules.validLength)}
          Password should be at least 8 characters long.
        </p>
        <p>
          {renderRuleIndicator(passwordRules.hasUppercase)}
          Password should contain at least one uppercase letter.
        </p>
        <p>
          {renderRuleIndicator(passwordRules.hasDigit)}
          Password should contain at least one digit.
        </p>
        <p>
          {renderRuleIndicator(passwordRules.hasSpecialChar)}
          Password should contain at least one special character.
        </p>
      </div>
    );
  };

  // ---------
  const validatePasswordRec = () => {
    const validLength = recPass.length >= 8;
    const hasUppercase = /[A-Z]/.test(recPass);
    const hasDigit = /\d/.test(recPass);
    const hasSpecialChar = /[!@#$%^&*_-]/.test(recPass);

    return { validLength, hasUppercase, hasSpecialChar, hasDigit };
  };

  const renderRuleIndicatorRec = (isValid) => {
    return isValid ? (
      <span
        className="ruleIndicator valid"
        id="greenTick"
        style={{ color: "green" }}
      >
        ✔
      </span>
    ) : (
      <span className="ruleIndicator" style={{ color: "red" }}>
        ✘
      </span>
    );
  };

  const renderPasswordRulesRec = () => {
    const passwordRules = validatePasswordRec(recPass);

    return (
      <div id="passwordRules">
        <p>
          {renderRuleIndicatorRec(passwordRules.validLength)}
          Password should be at least 8 characters long.
        </p>
        <p>
          {renderRuleIndicatorRec(passwordRules.hasUppercase)}
          Password should contain at least one uppercase letter.
        </p>
        <p>
          {renderRuleIndicatorRec(passwordRules.hasDigit)}
          Password should contain at least one digit.
        </p>
        <p>
          {renderRuleIndicatorRec(passwordRules.hasSpecialChar)}
          Password should contain at least one special character.
        </p>
      </div>
    );
  };
  // ---------

  const HandleCandidateRegister = async () => {
    if (email === "" && name === "" && password === "" && mobile === "") {
      alert("Please check all the input boxes");
    } else if (
      email === "" ||
      password === "" ||
      name === "" ||
      mobile === ""
    ) {
      alert("Please check your inputs");
    } else {
      const passwordRules = validatePassword(password);

      if (!passwordRules.validLength) {
        alert("Password should be at least 8 characters long.");
        return;
      }

      if (!passwordRules.hasUppercase) {
        alert("Password should contain at least one uppercase letter.");
        return;
      }

      if (!passwordRules.hasDigit) {
        alert("Password should contain at least one digit.");
        return;
      }

      if (!passwordRules.hasSpecialChar) {
        alert("Password should contain at least one special character.");
        return;
      }
      const obj = {
        name,
        email,
        mobile,
        password,
      };
      console.log(obj);
      try {
        await fetch(`http://localhost:5000/users/register`, {
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
              navigate("/login");
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

  const HandleRecruiterRegister = async () => {
    if (
      recEmail === "" &&
      recName === "" &&
      recPass === "" &&
      recMobile === "" &&
      company === ""
    ) {
      alert("Please check all the input boxes");
    } else if (
      recEmail === "" ||
      recPass === "" ||
      recName === "" ||
      recMobile === "" ||
      company === ""
    ) {
      alert("Please check your inputs");
    } else {
      const obj = {
        name: recName,
        email: recEmail,
        mobile: recMobile,
        password: recPass,
        company,
      };

      try {
        await fetch(`http://localhost:5000/recruiters/register`, {
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
              navigate("/login");
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

  return (
    <div className="container">
      <h2>Register</h2>
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
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Mobile number"
                onChange={(e) => setMobile(e.target.value)}
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
                  candidate ? HandleCandidateRegister : HandleRecruiterRegister
                }
                className="submit_btn"
              >
                Candidate Register
              </button>
              {renderPasswordRules()}
            </div>
          </div>
          <div className={recruiter ? "recruter_input" : "hide_inputs_rec_can"}>
            <div className="input_box_con">
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setRecName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setRecEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Mobile..."
                onChange={(e) => setRecMobile(e.target.value)}
              />
              <input
                type="text"
                placeholder="Company Name"
                onChange={(e) => setCompany(e.target.value)}
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
                  recruiter ? HandleRecruiterRegister : HandleCandidateRegister
                }
                className="submit_btn"
              >
                Recruiter Register
              </button>
              {renderPasswordRulesRec()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
