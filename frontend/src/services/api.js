import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://password-reset-pro.onrender.com/api/auth";

// User Registration API
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error("Register Error:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// User Login API
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Forgot Password API
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("Forgot Password Error:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Reset Password API
export const resetPassword = async (token, newPassword) => {
  try {
    console.log("Sending Reset Password Request with Token:", token);
    const response = await axios.post(`${API_BASE_URL}/reset-password/${token}`, { newPassword });
    return response.data;
  } catch (error) {
    console.error("Reset Password API Error:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch User Profile API
export const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Fetch Profile Error:", error);
    throw error.response ? error.response.data : error.message;
  }
};
