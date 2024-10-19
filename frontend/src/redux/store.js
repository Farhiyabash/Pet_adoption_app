import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import petReducer from './petSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        pets: petReducer,
    },
});

export default store;
