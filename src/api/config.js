import axios from "axios";
import { localService } from "./localService";

const API_BASE_URL = "https://elearningnew.cybersoft.edu.vn/api"; // Base URL of the backend

// Create Axios instance
export const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E",
    },
});

// Add interceptors to include Authorization header
apiInstance.interceptors.request.use(
    (config) => {
        const token = localService.getAccessToken(); // Get the access token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);