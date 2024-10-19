import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Ensure you're using the correct Router
import Navbar from './components/Navbar'; // Adjust import paths as needed
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Define your routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
};

export default App;
