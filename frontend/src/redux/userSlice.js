// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null,
        isLoggedIn: false,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload.token); // Save token to local storage
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token'); // Remove token from local storage
        },
    },
});

// Export the action creators
export const { setUser, logout } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

// Export the reducer
export default userSlice.reducer;
