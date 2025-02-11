import React, { useState } from "react";
import { forgotPassword } from "../services/api.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await forgotPassword(email);
      setMessage(response.message || "Reset link sent successfully!");
    } catch (error) {
      setMessage(error.message || "Error sending reset email");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow">
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
            <p className="mt-3 text-center text-success">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
