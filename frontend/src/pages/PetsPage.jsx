// src/pages/PetsPage.jsx

import React, { useEffect, useState } from 'react';
import { fetchPets } from '../services/PetService';
import PetList from '../components/PetList';
import Spinner from '../components/Spinner'; // You might want to create a spinner component for loading states
import Alert from '../components/Alert'; // An alert component for error handling

const PetsPage = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPets = async () => {
            try {
                const petsData = await fetchPets();
                setPets(petsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadPets();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <Alert message={error} />;

    return (
        <div className="pets-page">
            <h1>Available Pets for Adoption</h1>
            <PetList pets={pets} />
        </div>
    );
};

export default PetsPage;
