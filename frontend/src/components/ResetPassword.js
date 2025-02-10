import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://password-reset-pro.onrender.com/api/auth/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            alert(data.message);
            if (response.ok) navigate("/");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
