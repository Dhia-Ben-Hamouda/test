// component to handle refreshing tokens
import React, { useEffect } from "react";
import useAuth from "../utils/hooks/useAuth";
import api from "../api/axios";

export default function AuthHandler() {
    const [user, setUser] = useAuth();

    useEffect(() => {
        async function refreshTokens() {
            const response = await api.get("/api/auth/refresh");
            if(response.status === 401){
                localStorage.removeItem("user");
                setUser(null);

                window.location.href = "/";
            }
        }
        
        const interval = setInterval(() => {
            if (user) refreshTokens();
        }, 15 * 1000);

        return () => { clearInterval(interval); }
    }, [])

    return null;
}