import axios from "axios";

const API_BASE_URL = "https://password-reset-pro.onrender.com/api/auth";

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("Forgot Password Error:", error);
    throw error.response ? error.response.data : error.message;
  }
};

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
