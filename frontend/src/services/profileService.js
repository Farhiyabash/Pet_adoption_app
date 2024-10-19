// Get user profile
import api from './api'; // Correctly import the Axios instance

export const getUserProfile = async (token) => {
    try {
        const response = await api.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return the data received from the API
    } catch (error) {
        console.error('Error fetching user profile:', error.response?.data || error.message);
        throw error; // Rethrow the error for further handling
    }
};
