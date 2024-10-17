import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Pet-related API calls
export const getAllPets = async () => {
  const response = await axios.get(`${API_URL}/pets`);
  return response.data;
};

export const getPetById = async (id) => {
  const response = await axios.get(`${API_URL}/pets/${id}`);
  return response.data;
};

export const createPet = async (petData) => {
  const response = await axios.post(`${API_URL}/pets`, petData);
  return response.data;
};

export const updatePet = async (id, petData) => {
  const response = await axios.put(`${API_URL}/pets/${id}`, petData);
  return response.data;
};

export const deletePet = async (id) => {
  const response = await axios.delete(`${API_URL}/pets/${id}`);
  return response.data;
};

// User-related API calls
export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};
