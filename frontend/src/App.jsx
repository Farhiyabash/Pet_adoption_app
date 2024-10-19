// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import SignupPage from './pages/SignupPage';
import FavoritesPage from './pages/FavoritesPage';
import AdoptionsPage from './pages/AdoptionsPage';
import ReviewsPage from './pages/ReviewsPage';
import ProfilePage from './pages/ProfilePage';
import HomeNavbar from './components/HomeNavbar';  // Corrected path
import ProtectedRoute from './components/ProtectedRoute'; // Updated path

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Simulate fetching auth status (replace with actual logic)
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token'); // Example token check
            if (token) {
                setIsAuthenticated(true);
            }
        };
        checkAuth();
    }, []);

    return (
        <Router>
            <Routes>
                {/* Landing Page Route */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Home Page with Navbar */}
                <Route element={<HomeNavbar />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/pets" element={<PetsPage />} />
                    <Route path="/favorites" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <FavoritesPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/adoptions" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <AdoptionsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/reviews" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <ReviewsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <ProfilePage />
                        </ProtectedRoute>
                    } />
                </Route>

                {/* 404 Page Route */}
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
