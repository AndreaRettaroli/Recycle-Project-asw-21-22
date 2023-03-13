import axios from "axios";
import useUserSession from "../hooks/useUserSession";

const DEV_HOST_BACKEND = "http://localhost:3000";
const PROD_HOST_BACKEND = "http://localhost:3000";
//const { isLoggedIn, loggedUser, login, logout } = useUserSession();

const Api = axios.create({
    baseURL: DEV_HOST_BACKEND
});


Api.interceptors.request.use(async (config) => {
    const userSession = sessionStorage.getItem("userSession");
    if (userSession) {
        const { token } = JSON.parse(userSession);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default Api;
