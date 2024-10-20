import React, { useState } from 'react';
import { registerUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'; // Import custom CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [success, setSuccess] = useState(''); // Success message
    const [error, setError] = useState(''); // Error message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, password };
        setLoading(true); // Start loading

        try {
            await registerUser(userData);
            setSuccess('User successfully registered!'); // Set success message
            setError(''); // Clear any previous error message
            
            // Show loading spinner for 2 seconds before redirecting
            setTimeout(() => {
                navigate('/login'); // Redirect to login page
            }, 2000); // Adjust the time as needed (2000 ms = 2 seconds)
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.'); // Set error message
            setSuccess(''); // Clear any previous success message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="signup-container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '15px' }}>
                <h2 className="text-center mb-4" style={{ color: '#007bff' }}>Create Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name" className="text-muted">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="text-muted">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="text-muted">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block w-100 mt-3" disabled={loading}>
                        {loading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>
                {success && <div className="alert alert-success mt-3">{success}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                <div className="text-center mt-3">
                    <span>Already have an account? </span>
                    <a href="/login" className="text-primary">Login here</a>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
