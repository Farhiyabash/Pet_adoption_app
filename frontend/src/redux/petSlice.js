import { createSlice } from '@reduxjs/toolkit';
import { getPets } from '../services/petService';

const petSlice = createSlice({
    name: 'pets',
    initialState: {
        pets: [],
    },
    reducers: {
        setPets: (state, action) => {
            state.pets = action.payload;
        },
    },
});

export const { setPets } = petSlice.actions;

// Fetch pets data from the service
export const fetchPetsData = () => async (dispatch) => {
    const pets = await getPets();
    dispatch(setPets(pets));
};

export default petSlice.reducer;
