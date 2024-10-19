import React, { useEffect, useState } from 'react';
import { getPets } from '../api'; // Adjust the path based on your project structure
import PetCard from '../components/PetCard'; // Adjust the path based on your project structure
import Spinner from '../components/Spinner'; // Adjust the path based on your project structure
import './PetsPage.css'; // Adjust the path based on your project structure

const PetsPage = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const petData = await getPets();
                setPets(petData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    if (loading) {
        return <Spinner />; // Render a spinner while loading
    }

    if (error) {
        return <div className="alert alert-danger">{error.message}</div>; // Show error message
    }

    return (
        <div className="pets-page container">
            <h1 className="my-4">Available Pets for Adoption</h1>
            <div className="row">
                {pets.length > 0 ? (
                    pets.map((pet) => (
                        <div key={pet.id} className="col-md-4 mb-4">
                            <PetCard pet={pet} /> {/* Render PetCard for each pet */}
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info">No pets available for adoption at this time.</div>
                )}
            </div>
        </div>
    );
};

export default PetsPage;
