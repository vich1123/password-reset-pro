const API_BASE_URL = process.env.REACT_APP_API_URL || "https://password-reset-pro.onrender.com/api/auth";

export const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) throw new Error("Failed to send reset link");

        return await response.json();
    } catch (error) {
        console.error("Forgot Password Error:", error);
        throw error;
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reset-password/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: newPassword }),
        });

        if (!response.ok) throw new Error("Failed to reset password");

        return await response.json();
    } catch (error) {
        console.error("Reset Password Error:", error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) throw new Error("Invalid credentials");

        return await response.json();
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};
