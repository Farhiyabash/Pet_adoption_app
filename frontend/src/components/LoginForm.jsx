// src/components/LoginForm.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Simple client-side validation
        if (!email || !password) {
            setError('Email and Password are required.');
            return;
        }

        // Create userData object
        const userData = { email, password };
        onLogin(userData); // Call the onLogin function passed as a prop
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>} {/* Display error message */}

            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired, // Prop type for onLogin function
};

export default LoginForm;
