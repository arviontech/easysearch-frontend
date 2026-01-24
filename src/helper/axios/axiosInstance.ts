import axios from "axios";
import { getAccessToken } from "@/lib/actions/auth";

const axiosInstance = axios.create();

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;
axiosInstance.defaults.withCredentials = true;


axiosInstance.interceptors.request.use(async function (config) {
    console.log('[Axios] Making request to:', config.url);
    const token = await getAccessToken();
    console.log('[Axios] Token retrieved:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('[Axios] Authorization header set');
    } else {
        console.warn('[Axios] No token available, request will be unauthenticated');
    }
    return config;
}, function (error) {
    console.error('[Axios] Request interceptor error:', error);
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    console.log('[Axios] Response received from:', response.config.url, 'Status:', response.status);
    return response;
}, function (error) {
    // Handle global errors here (e.g., unauthorized)
    console.error('[Axios] Response error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
    });

    if (error.response?.status === 401) {
        console.error('[Axios] 401 Unauthorized - Token may be invalid or missing');
        // Optional: handle logout or refresh token logic
    }
    return Promise.reject(error);
});

export default axiosInstance;
