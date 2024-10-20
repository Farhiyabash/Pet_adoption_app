import axios from 'axios';

// Set the base URL for your API
const API_URL = 'http://localhost:5000'; // Update if necessary

// Utility function to get the JWT token from local storage
const getToken = () => localStorage.getItem('access_token');

// ---------- USER API FUNCTIONS ----------

export const createUser = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users`, {
            name,
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const refreshToken = async () => {
    try {
        const response = await axios.post(`${API_URL}/refresh`, {}, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const checkEmailAvailability = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/check-email`, {
            params: { email }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// ---------- PET API FUNCTIONS ----------

export const getPets = async () => {
    try {
        const response = await axios.get(`${API_URL}/pets`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createPet = async (name, age, description, petTypeId, ownerId) => {
    try {
        const response = await axios.post(`${API_URL}/pets`, {
            name,
            age,
            description,
            pet_type_id: petTypeId,
            owner_id: ownerId
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getPet = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updatePet = async (id, petData) => {
    try {
        const response = await axios.put(`${API_URL}/pets/${id}`, petData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deletePet = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// ---------- BREED API FUNCTIONS ----------

export const getBreeds = async () => {
    try {
        const response = await axios.get(`${API_URL}/breeds`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createBreed = async (name) => {
    try {
        const response = await axios.post(`${API_URL}/breeds`, {
            name
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// ---------- PET TYPE API FUNCTIONS ----------

export const getPetTypes = async () => {
    try {
        const response = await axios.get(`${API_URL}/pet-types`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createPetType = async (name) => {
    try {
        const response = await axios.post(`${API_URL}/pet-types`, {
            name
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// ---------- REVIEW API FUNCTIONS ----------

export const getReviews = async () => {
    try {
        const response = await axios.get(`${API_URL}/reviews`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createReview = async (content, rating, userId, petId) => {
    try {
        const response = await axios.post(`${API_URL}/reviews`, {
            content,
            rating,
            user_id: userId,
            pet_id: petId
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getReview = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/reviews/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateReview = async (id, reviewData) => {
    try {
        const response = await axios.put(`${API_URL}/reviews/${id}`, reviewData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteReview = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/reviews/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// ---------- REPLY API FUNCTIONS ----------

export const createReply = async (content, reviewId, userId) => {
    try {
        const response = await axios.post(`${API_URL}/replies`, {
            content,
            review_id: reviewId,
            user_id: userId
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getReply = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/replies/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateReply = async (id, replyData) => {
    try {
        const response = await axios.put(`${API_URL}/replies/${id}`, replyData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteReply = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/replies/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// ---------- FAVORITE API FUNCTIONS ----------

export const getFavorites = async () => {
    try {
        const response = await axios.get(`${API_URL}/favorites`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createFavorite = async (userId, petId) => {
    try {
        const response = await axios.post(`${API_URL}/favorites`, {
            user_id: userId,
            pet_id: petId
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteFavorite = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/favorites/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// ---------- ADOPTION API FUNCTIONS ----------

export const createAdoptionRequest = async (userId, petId, adoptionMessage) => {
    try {
        const response = await axios.post(`${API_URL}/adoptions`, {
            user_id: userId,
            pet_id: petId,
            message: adoptionMessage
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getAdoptionRequests = async () => {
    try {
        const response = await axios.get(`${API_URL}/adoptions`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateAdoptionRequest = async (id, status) => {
    try {
        const response = await axios.put(`${API_URL}/adoptions/${id}`, {
            status
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteAdoptionRequest = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/adoptions/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
