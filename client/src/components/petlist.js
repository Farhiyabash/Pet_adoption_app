import React, { useEffect, useState } from 'react';
import PetCard from './petcard';

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch('/api/pets'); // Adjust the API endpoint as necessary
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPets(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    if (loading) {
        return <div>Loading pets...</div>;
    }

    if (error) {
        return <div>Error fetching pets: {error}</div>;
    }

    return (
        <div className="pet-list">
            {pets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
            ))}
        </div>
    );
};

export default PetList;
