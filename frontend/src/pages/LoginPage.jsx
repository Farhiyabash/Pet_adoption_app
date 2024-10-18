// src/pages/LoginPage.jsx

import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { loginUser } from '../redux/userSlice'; // Redux action for user login
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/LoginPage.css'; // Custom CSS for additional styles

const LoginPage = () => {
    const dispatch = useDispatch();

    // Function to handle login
    const handleLogin = (userData) => {
        dispatch(loginUser(userData)); // Dispatch the login action
    };

    return (
        <div className="login-page">
            <Navigation />
            <header className="text-center py-5">
                <h1 className="display-4">Login</h1>
                <p className="lead">Welcome back! Please log in to continue.</p>
            </header>
            <main className="container my-5">
                <LoginForm onLogin={handleLogin} /> {/* Login form component */}
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;
