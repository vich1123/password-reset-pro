import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post("https://password-reset-pro.onrender.com/api", { email });
      setMessage(response.data.message || "Reset link sent successfully!");
      setError("");
    } catch (err) {
      console.error("Forgot Password Error:", err);
      setError("Error sending reset email. Try again.");
      setMessage("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Forgot Password</h2>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-warning w-100" onClick={handleForgotPassword}>
          Send Reset Link
        </button>
        {message && <p className="mt-3 text-center text-success">{message}</p>}
        {error && <p className="mt-3 text-center text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
