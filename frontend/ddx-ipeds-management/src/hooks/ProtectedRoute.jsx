import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../Service/AuthService";

export const ProtectedRoute = () => {
    const isLoggedIn = getToken() != null

    if(!isLoggedIn){
        return <Navigate to="/login" replace/>
    }

    return <Outlet />
}