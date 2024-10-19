// src/components/FavoritesPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchFavorites } from '../api'; // Adjust the path as necessary
import PetCard from '../components/PetCard'; // Adjust the path as necessary
import Loader from '../components/Loader'; // Adjust the path as necessary

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const response = await fetchFavorites();
                setFavorites(response.data); // Adjust based on your response structure
            } catch (error) {
                setError('Failed to load favorites. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Your Favorite Pets</h2>
            {loading && <Loader />}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && favorites.length === 0 && (
                <div className="alert alert-info text-center">No favorites found.</div>
            )}
            <div className="row">
                {!loading && favorites.map(pet => (
                    <div className="col-md-4 mb-4" key={pet.id}>
                        <PetCard pet={pet} /> {/* Assuming PetCard accepts a pet prop */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;
