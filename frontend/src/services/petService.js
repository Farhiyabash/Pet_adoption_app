// src/services/petService.js
import axios from 'axios';

// Function to fetch pets data from the backend
export const fetchPetsData = async () => {
    const response = await axios.get('http://127.0.0.1:5000/pets'); // Replace with your actual API endpoint
    return response.data; // Return the data from the response
};
