import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPetById } from '../services/PetService'; // Import API call
import './PetDetails.css'; // Import custom CSS for additional styling

const PetDetails = () => {
    const { id } = useParams(); // Get pet ID from URL
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPetDetails = async () => {
            try {
                const petData = await fetchPetById(id); // Fetch pet by ID
                setPet(petData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getPetDetails();
    }, [id]);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-danger">Error: {error}</p>;
    }

    return (
        <div className="container mt-5">
            {pet ? (
                <div className="card shadow-lg p-4 pet-details-card">
                    <div className="row g-0">
                        <div className="col-md-5">
                            <img 
                                src={pet.image_url || 'default-image-url.jpg'} 
                                alt={pet.name || 'Unknown Pet'} 
                                className="img-fluid pet-image"
                            />
                        </div>
                        <div className="col-md-7">
                            <div className="card-body">
                            <h1 className="adoption-header text-center animated fadeIn">These are the Adoption Pets!</h1>

                                <h3 className="card-title pet-name">{pet.name}</h3>
                                <p className="card-text"><strong>Breed:</strong> {pet.breed}</p>
                                <p className="card-text"><strong>Age:</strong> {pet.age ? `${pet.age} years` : 'Unknown age'}</p>
                                <p className="card-text"><strong>Description:</strong> {pet.description || 'No description available.'}</p>
                                <div className="mt-4">
                                    <button className="btn btn-primary adopt-button">Adopt Me!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No details available for this pet.</p>
            )}
        </div>
    );
};

export default PetDetails;
