// src/pages/PetDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPetById } from '../services/PetService'; // Import the service to fetch pet details
import AdoptionRequestForm from '../components/AdoptionRequestForm'; // Import the AdoptionRequestForm
import Spinner from '../components/Spinner'; // Import Spinner component
import Alert from '../components/Alert'; // Import Alert component
import { getAccessToken } from '../utils/tokenUtils'; // Utility to get the access token

const PetDetails = () => {
    const { id } = useParams(); // Extract the pet ID from the URL parameters
    const [pet, setPet] = useState(null); // State to hold pet details
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to hold error messages

    // Function to get the current user's ID from the token
    const getCurrentUserId = () => {
        const token = getAccessToken();
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get user ID
            return decodedToken.userId; // Adjust according to your token's payload structure
        }
        return null; // Return null if no user ID is found
    };

    // Fetch pet details when the component mounts
    useEffect(() => {
        const loadPetDetails = async () => {
            try {
                const petData = await fetchPetById(id); // Fetch pet details by ID
                setPet(petData); // Set the pet data into state
            } catch (err) {
                setError(err.message); // Set error message if fetch fails
            } finally {
                setLoading(false); // Stop loading
            }
        };

        loadPetDetails(); // Invoke the fetch function
    }, [id]);

    // Show loading spinner while fetching data
    if (loading) return <Spinner />;
    // Show error alert if there is an error
    if (error) return <Alert message={error} type="danger" />;
    // Show message if no pet details are found
    if (!pet) return <div>No pet details found.</div>;

    // Get the current user's ID for the adoption request form
    const userId = getCurrentUserId();

    return (
        <div className="container pet-details mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={pet.imageUrl} alt={pet.name} className="img-fluid mb-3 rounded" />
                </div>
                <div className="col-md-6">
                    <h1>{pet.name}</h1>
                    <p><strong>Breed:</strong> {pet.breed}</p>
                    <p><strong>Age:</strong> {pet.age} years</p>
                    <p><strong>Description:</strong> {pet.description}</p>
                    <button className="btn btn-success">Adopt {pet.name}</button>
                </div>
            </div>
            <hr />
            {userId && <AdoptionRequestForm userId={userId} petId={pet.id} />} {/* Pass user ID to the form if available */}
        </div>
    );
};

export default PetDetails;
