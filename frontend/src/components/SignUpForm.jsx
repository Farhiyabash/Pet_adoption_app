// src/components/SignUpForm.jsx
import React, { useState } from 'react';

const SignUpForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validate fields (simple validation)
        if (!name || !email || !password) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        const userData = { name, email, password };
        onSubmit(userData); // Call the onSubmit prop to handle registration
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            {error && <p className="text-danger">{error}</p>}
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
        </form>
    );
};

export default SignUpForm;
