import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;


axiosInstance.interceptors.request.use(function (config) {
    //set token
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function onFulfilled(response) {
    const responseObj = {
        data: response.data,
        meta: response.data.meta,
    }
    return response;
}, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});



export default axiosInstance
