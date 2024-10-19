// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api'; // Adjust the path to your API service
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await loginUser(email, password);
            const { accessToken } = response.data; // Adjust based on your response structure
            localStorage.setItem('accessToken', accessToken);
            alert('Logged in successfully!');
            navigate('/home'); // Redirect to HomePage after successful login
        } catch (error) {
            setError(error.message || 'An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>
                    <p className="text-center mt-3">
                        Don't have an account? <a href="/signup">Sign up here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
