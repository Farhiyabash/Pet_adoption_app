// src/components/PetsPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchAllPets } from '../api'; // Import your API function
import PetList from '../components/PetList';
import Loader from '../components/Loader';

const PetsPage = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPets = async () => {
            try {
                const response = await fetchAllPets();
                setPets(response.data); // Adjust based on your API response structure
            } catch (error) {
                setError('Failed to fetch pets. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        getPets();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div className="text-danger">{error}</div>;

    return (
        <div className="mt-5">
            <h2 className="text-center mb-4">Available Pets for Adoption</h2>
            <PetList pets={pets} />
        </div>
    );
};

export default PetsPage;
