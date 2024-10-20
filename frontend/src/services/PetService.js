// src/services/PetService.js

import axios from 'axios';
import { getAccessToken, isTokenExpired, refreshAccessToken } from '../utils/tokenUtils';

const API_URL = 'http://127.0.0.1:5000/pets'; // Update with your backend API URL

// Fetch all pets
export const fetchPets = async () => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken(); // Get new token if refreshed
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
        return response.data; // Return pets data
    } catch (error) {
        console.error('Failed to fetch pets:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch pets');
    }
};

// Add a new pet
export const addPet = async (petData) => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken(); // Get new token if refreshed
        const response = await axios.post(API_URL, petData, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
        return response.data; // Return the added pet data
    } catch (error) {
        console.error('Failed to add pet:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to add pet');
    }
};

// Update a pet
export const updatePet = async (petId, petData) => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken(); // Get new token if refreshed
        const response = await axios.put(`${API_URL}/${petId}`, petData, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
        return response.data; // Return the updated pet data
    } catch (error) {
        console.error('Failed to update pet:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to update pet');
    }
};

// Delete a pet
export const deletePet = async (petId) => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken(); // Get new token if refreshed
        await axios.delete(`${API_URL}/${petId}`, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
    } catch (error) {
        console.error('Failed to delete pet:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to delete pet');
    }
};
