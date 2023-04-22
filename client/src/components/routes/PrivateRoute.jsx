import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const isLogin = useSelector((state) => state.isLogin);
    console.log(isLogin);
    if (isLogin) return children;
    return <Navigate to="/login" />;
}

export default PrivateRoute;
