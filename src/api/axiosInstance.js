import { store } from "../store"; // Corrected to use named import
import axios from "axios";
import { logout } from "../slices/authSlice";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

// Token refresh function
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    console.error("No refresh token found");
    return null;
  }

  try {
    const response = await axiosInstance.post(`/api/token/refresh/`, { refresh: refreshToken });

    const newAccessToken = response.data.access;
    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error.response?.data);
    return null;
  }
};

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to refresh token on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token is expired
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();

      if (newToken) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); // Retry original request
      } else {
        // Optionally redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        store.dispatch(logout());  // Dispatch logout action
        window.location.href = "/login";
      }
    }

    axiosInstance.interceptors.request.use(
      (config) => {
        console.log("Request Headers:", config.headers);
        return config;
      },
      (error) => Promise.reject(error)
    );

    return Promise.reject(error);
  }
);

export default axiosInstance;
