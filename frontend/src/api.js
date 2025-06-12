// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // adjust as needed
  withCredentials: true, // if using cookies/session
});

// Login API
export const loginUser = async (email, password) => {
  return await API.post("/api/auth/login", { email, password });
};

// Register API
export const registerUser = async (userData) => {
  return await API.post("/api/auth/register", userData);
};

export default API;
