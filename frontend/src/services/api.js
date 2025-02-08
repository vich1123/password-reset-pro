export const API_BASE_URL = "https://password-reset-pro.onrender.com/api/auth"; // Ensure this is correct

export const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) throw new Error("Failed to send reset link");

        return response.json();
    } catch (error) {
        console.error("Forgot Password Error:", error);
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

        return response.json();
    } catch (error) {
        console.error("Reset Password Error:", error);
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

        return response.json();
    } catch (error) {
        console.error("Login Error:", error);
    }
};
