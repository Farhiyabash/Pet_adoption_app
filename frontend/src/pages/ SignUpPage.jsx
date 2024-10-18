// src/pages/SignUpPage.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import SignUpForm from '../components/SignUpForm';
import { registerUser } from '../redux/userSlice'; // Redux action for user registration
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/SignUpPage.css'; // Custom CSS for additional styles

const SignUpPage = () => {
    const dispatch = useDispatch();

    const handleSubmit = (userData) => {
        dispatch(registerUser(userData)); // Dispatch the registration action
    };

    return (
        <div className="signup-page">
            <Navigation />
            <header className="text-center py-5">
                <h1 className="display-4">Sign Up</h1>
                <p className="lead">Join us to find your perfect pet!</p>
            </header>
            <main className="container my-5">
                <SignUpForm onSubmit={handleSubmit} /> {/* Sign up form component */}
            </main>
            <Footer />
        </div>
    );
};

export default SignUpPage;
