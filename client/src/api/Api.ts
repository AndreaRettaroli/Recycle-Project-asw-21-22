import axios from "axios";

const DEV_HOST_BACKEND = "http://localhost:3000";
const PROD_HOST_BACKEND = "http://localhost:3000";

const api = axios.create({
    baseURL: DEV_HOST_BACKEND
});

api.interceptors.request.use(async (config) => {
    const token = config?.headers?.Authorization?.toString().split(' ')[1];
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;


//import axios, { AxiosInstance } from 'axios';
// const API: AxiosInstance = axios.create({
//   baseURL: 'http://localhost:3000/'
// });


// // Set the token in the Authorization header
// const setAuthToken = (token: string) => {
//     if (token) {
//         api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//         delete api.defaults.headers.common["Authorization"];
//     }
// };

// const request = <T>(
//     method: Method,
//     url: string,
//     params?: any,
//     data?: any,
//     token?: string
// ): Promise<AxiosResponse<T>> => {
//     if (token) {
//         setAuthToken(token);
//     }
//     return api.request<T>({
//         method,
//         url,
//         params,
//         data
//     });
// };


