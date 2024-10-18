// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import your user reducer
import petReducer from './petSlice'; // If you have a pet reducer

const store = configureStore({
    reducer: {
        user: userReducer,
        pets: petReducer, // If applicable
    },
});

export default store;
