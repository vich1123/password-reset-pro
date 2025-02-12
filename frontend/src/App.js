import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.js";
import ForgotPassword from "./components/ForgotPassword.js";
import ResetPassword from "./components/ResetPassword.js";
import Dashboard from "./components/Dashboard.js";
import "./styles.css"; // Ensure styles are loaded

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
