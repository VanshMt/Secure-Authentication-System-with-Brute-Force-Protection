import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // For sending cookies (refresh token)
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🔐 Handle 401 responses globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Interceptor hit");
    console.log("Interceptor status:", error.response?.status);
    console.log("Response status:", error.response?.status);
    if (error.response?.status === 401) {
      // Clear auth token
      localStorage.removeItem("token");
      // Redirect to login
      console.log("Redirecting to login");
      console.log("Current URL:", window.location.href);
      console.log("Attempting redirect...");
      // window.location.href = "/login";
      console.log("Current URL:", window.location.href);
      console.log("Using window.location.replace");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default API;