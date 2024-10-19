// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" />;
    }
    return children; // Render the children components if authenticated
};

export default ProtectedRoute;
