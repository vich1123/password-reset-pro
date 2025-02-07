import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5001/api/auth/reset-password/${token}`, {
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
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Reset Password</h2>
                <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

const styles = {
    container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" },
    form: { display: "flex", flexDirection: "column", gap: "10px", padding: "20px", border: "1px solid #ddd", borderRadius: "5px" },
};

export default ResetPassword;
