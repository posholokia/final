import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
    const token = localStorage.getItem('token');
    let isLoggedIn = false;

    // если есть токен, то пользователь авторизован
    isLoggedIn = true ? !!token : false;
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default Protected;