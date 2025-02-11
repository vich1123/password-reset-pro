import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>Welcome to the Dashboard</h1>
        <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
