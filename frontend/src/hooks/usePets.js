// src/hooks/usePets.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../redux/petSlice'; // Import the fetchPets action

const usePets = () => {
    const dispatch = useDispatch();
    const pets = useSelector((state) => state.pets.list); // Get pet list from Redux store
    const loading = useSelector((state) => state.pets.loading); // Get loading state
    const error = useSelector((state) => state.pets.error); // Get error state

    useEffect(() => {
        dispatch(fetchPets()); // Fetch pets when the hook is used
    }, [dispatch]);

    return { pets, loading, error }; // Return pet data and state
};

export default usePets;
