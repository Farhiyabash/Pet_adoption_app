// src/redux/petSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPetsData } from '../services/petService'; // Import the API function for fetching pet data

// Async thunk for fetching pets
export const fetchPets = createAsyncThunk('pets/fetchPets', async () => {
    const response = await fetchPetsData(); // Call the API service function
    return response; // Return the fetched pets
});

// Create the pet slice
const petSlice = createSlice({
    name: 'pets',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPets.pending, (state) => {
                state.loading = true; // Set loading to true when fetching starts
                state.error = null; // Reset any previous errors
            })
            .addCase(fetchPets.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false when fetching succeeds
                state.list = action.payload; // Set the list of pets to the fetched data
            })
            .addCase(fetchPets.rejected, (state, action) => {
                state.loading = false; // Set loading to false when fetching fails
                state.error = action.error.message; // Set the error message
            });
    },
});

// Export the actions and reducer
export default petSlice.reducer;
export const selectPets = (state) => state.pets.list; // Selector to access the pet list
