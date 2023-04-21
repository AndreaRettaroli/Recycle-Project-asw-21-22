import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
    userId: string;
    token: string
}

interface UserSession {
    isLoggedIn: boolean;
    loggedUser: UserData
    login: (token: string, userId: string) => void
    logout: () => void

}

const useUserSession = (): UserSession => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState({ token: "", userId: "" });
    const navigate = useNavigate()

    useEffect(() => {
        // Check if user session exists in sessionStorage
        const userSession = sessionStorage.getItem("userSession");
        console.log("🚀 ~ file: useUserSession.ts:20 ~ useEffect ~ userSession:", userSession)

        if (userSession) {
            const { token, userId } = JSON.parse(userSession);
            setLoggedUser({ token, userId });
            setIsLoggedIn(true);
        }
    }, []);

    const login = (token: string, userId: string) => {
        // Store user session in sessionStorage
        //localStorage.setItem("auth", response.data.token);
        sessionStorage.setItem("userSession", JSON.stringify({ token, userId }));
        setLoggedUser({ token, userId });
        setIsLoggedIn(true);
    };

    const logout = () => {
        // Remove user session from sessionStorage
        sessionStorage.removeItem("userSession");
        setLoggedUser({ token: "", userId: "" });
        setIsLoggedIn(false);
        navigate("/login")
    };

    return {
        isLoggedIn,
        loggedUser,
        login,
        logout,
    };
};

export default useUserSession;
