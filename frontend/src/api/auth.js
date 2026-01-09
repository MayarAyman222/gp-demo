import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

export const signup = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/register`, userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};
