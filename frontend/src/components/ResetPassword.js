import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api.js";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await resetPassword(token, newPassword);
      setMessage(response.message || "Password reset successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage(error.message || "Error resetting password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Reset Password</h2>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="btn btn-success w-100" onClick={handleResetPassword}>
              Reset Password
            </button>
            <p className="mt-3 text-center text-success">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
