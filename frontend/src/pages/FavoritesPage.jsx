import React, { useEffect, useState } from 'react';
import { getFavorites, deleteFavorite } from '../api'; // Adjust the path as necessary
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import { toast } from 'react-toastify'; // For notifications (optional)

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    // If you need userId later, keep it; otherwise, you can remove this line
    const userId = useSelector((state) => state.user.id); // Assuming you're storing user info in Redux

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await getFavorites(userId); // Pass userId if necessary
                setFavorites(response); // Assuming response is an array of favorite pets
            } catch (error) {
                console.error('Error fetching favorites:', error);
                toast.error('Failed to fetch favorites'); // Optional notification for error
            }
        };

        fetchFavorites();
    }, [userId]); // Adding userId as a dependency if you need it to fetch favorites

    const handleDeleteFavorite = async (favoriteId) => {
        try {
            await deleteFavorite(favoriteId);
            setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== favoriteId));
            toast.success('Favorite removed successfully'); // Optional notification for success
        } catch (error) {
            console.error('Error deleting favorite:', error);
            toast.error('Failed to remove favorite'); // Optional notification for error
        }
    };

    return (
        <div className="container mt-5">
            <h2>Your Favorite Pets</h2>
            {favorites.length === 0 ? (
                <p>You have no favorite pets yet.</p>
            ) : (
                <ul className="list-group">
                    {favorites.map((favorite) => (
                        <li key={favorite.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{favorite.pet.name}</strong> {/* Adjust according to your data structure */}
                                <p>{favorite.pet.description}</p> {/* Adjust according to your data structure */}
                            </div>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteFavorite(favorite.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoritesPage;
