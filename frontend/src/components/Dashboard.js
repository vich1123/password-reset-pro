import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You are logged in!</p>
      <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px", background: "red", color: "white", border: "none", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
