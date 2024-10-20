// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import PetsPage from './pages/PetsPage'; // Import the PetsPage
import PetAdoptionNavbar from './components/PetAdoptionNavbar';
import ProtectedRoute from './components/ProtectedRoute'; // A custom component to protect routes

const App = () => {
    const isAuthenticated = !!localStorage.getItem('access_token');

    return (
        <Router>
            {/* Conditional Navbar: Show different navbar based on authentication status */}
            {isAuthenticated && <PetAdoptionNavbar />}

            <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignUpPage />} />

                {/* Protected routes */}
                <Route 
                    path="/profile" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <ProfilePage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/pets" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <PetsPage />
                        </ProtectedRoute>
                    } 
                />

                {/* Redirect any unknown routes to the landing page */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
