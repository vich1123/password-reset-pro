import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/auth";

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reset-password`, { token, newPassword });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
