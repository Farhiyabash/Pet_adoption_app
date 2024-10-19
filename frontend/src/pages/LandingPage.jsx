import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="text-center">
            <h1>Welcome to the Pet Adoption App</h1>
            <p>Find your new best friend today!</p>
            <Link to="/signup" className="btn btn-primary mx-2">Sign Up</Link>
            <Link to="/login" className="btn btn-secondary mx-2">Login</Link>
        </div>
    );
};

export default LandingPage;
