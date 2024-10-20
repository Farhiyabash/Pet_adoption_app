// src/components/ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = !!localStorage.getItem('access_token'); // Check if access token exists

    return (
        <Route
            {...rest}
            element={isLoggedIn ? <Component /> : <Navigate to="/login" />}
        />
    );
};

export default ProtectedRoute;
