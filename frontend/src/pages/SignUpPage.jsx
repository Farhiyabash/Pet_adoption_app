// SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api'; // Adjust the path to your API service
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            setLoading(false);
            return;
        }

        try {
            await registerUser(formData.name, formData.email, formData.password);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after 2 seconds
            }, 2000);
        } catch (error) {
            setError(error.message || 'An error occurred during signup.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">Successfully signed up!</div>}
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>
                    <p className="text-center mt-3">
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
