// src/services/api.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your backend URL
    timeout: 5000,
});

// Function to fetch pets data
export const fetchPetsData = async () => {
    const response = await api.get('/pets'); // Fetch pets from the backend
    return response.data; // Return the fetched data
};

// Add other API functions as needed
