// src/lib/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "irent-qebh.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
