// src/__tests__/api.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../App'; // Adjust the path according to your project structure
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create an instance of axios mock adapter
const mock = new MockAdapter(axios);

describe('User Authentication', () => {
    afterEach(() => {
        mock.reset(); // Reset mocks after each test
    });

    test('should register a new user', async () => {
        const userData = { name: 'Test User', email: 'test@example.com', password: 'password123' };

        mock.onPost('http://127.0.0.1:5000/users').reply(200, userData);

        const { getByPlaceholderText, getByText } = render(<App />);

        // Fill in registration form
        fireEvent.change(getByPlaceholderText('Name'), { target: { value: userData.name } });
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: userData.email } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: userData.password } });
        fireEvent.click(getByText('Register'));

        await waitFor(() => expect(getByText('Registration successful! You can now log in.')).toBeInTheDocument());
    });

    test('should login a user and fetch the profile', async () => {
        const credentials = { email: 'test@example.com', password: 'password123' };
        const userProfile = { name: 'Test User', email: 'test@example.com' };
        const tokens = { access_token: 'fake_access_token', refresh_token: 'fake_refresh_token' };

        // Mock login request
        mock.onPost('http://127.0.0.1:5000/login').reply(200, tokens);
        // Mock profile request
        mock.onGet('http://127.0.0.1:5000/users/profile').reply(200, userProfile);

        const { getByPlaceholderText, getByText } = render(<App />);

        // Register the user first
        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Test User' } });
            fireEvent.change(getByPlaceholderText('Email'), { target: { value: credentials.email } });
            fireEvent.change(getByPlaceholderText('Password'), { target: { value: credentials.password } });
            fireEvent.click(getByText('Register'));
        });

        // Login the user
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: credentials.email } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: credentials.password } });
        fireEvent.click(getByText('Login'));

        await waitFor(() => {
            expect(getByText(`Welcome, ${userProfile.name}`)).toBeInTheDocument();
        });

        // Fetch profile
        fireEvent.click(getByText('Fetch Profile'));

        await waitFor(() => {
            expect(getByText(`Welcome, ${userProfile.name}`)).toBeInTheDocument();
        });
    });

    test('should handle login failure', async () => {
        const credentials = { email: 'wrong@example.com', password: 'wrongpassword' };

        mock.onPost('http://127.0.0.1:5000/login').reply(401, { message: 'Invalid credentials' });

        const { getByPlaceholderText, getByText } = render(<App />);

        // Attempt to login
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: credentials.email } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: credentials.password } });
        fireEvent.click(getByText('Login'));

        await waitFor(() => {
            expect(getByText('Invalid credentials')).toBeInTheDocument();
        });
    });

    test('should logout the user', async () => {
        const { getByText, getByPlaceholderText } = render(<App />);

        // Register and log in the user first
        mock.onPost('http://127.0.0.1:5000/users').reply(200);
        mock.onPost('http://127.0.0.1:5000/login').reply(200, {
            access_token: 'fake_access_token',
            refresh_token: 'fake_refresh_token',
        });

        fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Test User' } });
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(getByText('Register'));

        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(getByText('Login'));

        // Logout
        fireEvent.click(getByText('Logout'));

        await waitFor(() => {
            expect(getByText('Login')).toBeInTheDocument();
        });
    });
});
