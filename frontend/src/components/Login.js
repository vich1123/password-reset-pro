import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5001/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            alert(data.message);
            if (response.ok) {
                login(data);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Login</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
                <p onClick={() => navigate("/forgot-password")} style={styles.link}>Forgot Password?</p>
            </form>
        </div>
    );
};

const styles = {
    container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" },
    form: { display: "flex", flexDirection: "column", gap: "10px", padding: "20px", border: "1px solid #ddd", borderRadius: "5px" },
    link: { cursor: "pointer", color: "blue", textAlign: "center", marginTop: "10px" },
};

export default Login;
