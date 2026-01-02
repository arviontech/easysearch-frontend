import axios from "axios";
import { getAccessToken } from "@/lib/actions/auth";

const axiosInstance = axios.create();

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;
axiosInstance.defaults.withCredentials = true;


axiosInstance.interceptors.request.use(async function (config) {
    const token = await getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // Handle global errors here (e.g., unauthorized)
    if (error.response?.status === 401) {
        // Optional: handle logout or refresh token logic
    }
    return Promise.reject(error);
});

export default axiosInstance;
