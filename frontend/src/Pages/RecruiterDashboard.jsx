import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Recruiter Dashboard</h1>
      <button onClick={() => navigate("/recruiter/applications")}>
        View Applied Candidates
      </button>
    </div>
  );
};

export default RecruiterDashboard;
