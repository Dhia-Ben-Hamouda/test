import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";

export default function PrivateRoutes() {
    const [user, setUser] = useAuth()

    return user ? <Outlet /> : <Navigate to="/auth" />
}