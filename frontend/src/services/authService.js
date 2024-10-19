import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // Update with your backend API URL

// Register a new user
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data; // Return the response data
};

// Login a user
export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data; // Should return access token and user data
};

// Get user pets
export const fetchUserPets = async (userId, token) => {
    const response = await axios.get(`${API_URL}/pets/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; // Return the pets data
};
