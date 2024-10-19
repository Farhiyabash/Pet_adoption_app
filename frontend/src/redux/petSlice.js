// src/redux/petSlice.js
import { createSlice } from '@reduxjs/toolkit';

const petSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPets(state, action) {
      state.pets = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setPets, setLoading, setError } = petSlice.actions;
export default petSlice.reducer;
