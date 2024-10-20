// src/services/adoptionRequestService.js

import axios from 'axios';
import {
    getAccessToken,
    refreshAccessToken,
    isTokenExpired,
} from '../utils/tokenUtils';

const API_URL = 'http://127.0.0.1:5000'; // Update with your backend API URL

// Helper function to handle token management
const getValidToken = async () => {
    let token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
        token = getAccessToken(); // Retrieve the new token after refresh
    }

    return token;
};

// Fetch all adoption requests
export const fetchAdoptionRequests = async () => {
    const token = await getValidToken();

    try {
        const response = await axios.get(`${API_URL}/adoption-requests`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the list of adoption requests
    } catch (error) {
        console.error('Failed to fetch adoption requests:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch adoption requests');
    }
};

// Create a new adoption request
export const createAdoptionRequest = async (requestData) => {
    const token = await getValidToken();

    try {
        const response = await axios.post(`${API_URL}/adoption-requests`, requestData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        return response.data; // Return the newly created adoption request
    } catch (error) {
        console.error('Failed to create adoption request:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to create adoption request');
    }
};

// Fetch a single adoption request by ID
export const fetchAdoptionRequest = async (id) => {
    const token = await getValidToken();

    try {
        const response = await axios.get(`${API_URL}/adoption-requests/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the adoption request data
    } catch (error) {
        console.error(`Failed to fetch adoption request ${id}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || `Failed to fetch adoption request ${id}`);
    }
};

// Update an existing adoption request
export const updateAdoptionRequest = async (id, updateData) => {
    const token = await getValidToken();

    try {
        const response = await axios.put(`${API_URL}/adoption-requests/${id}`, updateData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        return response.data; // Return the updated adoption request
    } catch (error) {
        console.error(`Failed to update adoption request ${id}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || `Failed to update adoption request ${id}`);
    }
};

// Delete an adoption request
export const deleteAdoptionRequest = async (id) => {
    const token = await getValidToken();

    try {
        const response = await axios.delete(`${API_URL}/adoption-requests/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return success message
    } catch (error) {
        console.error(`Failed to delete adoption request ${id}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || `Failed to delete adoption request ${id}`);
    }
};
