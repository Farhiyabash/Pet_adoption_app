// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk('user/registerUser', async (userData) => {
    const response = await fetch('http://127.0.0.1:5000/signup', { // Update with your API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Registration failed!'); // Handle registration failure
    }

    return response.json(); // Return user data after successful registration
});

// New login action
export const loginUser = createAsyncThunk('user/loginUser', async (userData) => {
    const response = await fetch('http://127.0.0.1:5000/login', { // Update with your API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Login failed!'); // Handle login failure
    }

    return response.json(); // Return user data after successful login
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        info: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.info = action.payload; // Store user info in the state
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.info = action.payload; // Store user info in the state
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message
            });
    },
});

export default userSlice.reducer;
