// src/pages/AdoptionsPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchAdoptions } from '../api'; // After moving
import Loader from '../components/Loader'; // Adjust path to Loader
import AdoptionCard from '../components/AdoptionCard'; // Adjust path to AdoptionCard

const AdoptionsPage = () => {
    const [adoptions, setAdoptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAdoptions = async () => {
            try {
                const response = await fetchAdoptions(); // Adjust response structure as necessary
                setAdoptions(response.data); // Assuming response has a data property
            } catch (error) {
                setError('Failed to load adoption requests. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadAdoptions();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Your Adoption Requests</h2>
            {loading && <Loader />}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && adoptions.length === 0 && (
                <div className="alert alert-info text-center">No adoption requests found.</div>
            )}
            <div className="row">
                {!loading && adoptions.map(adoption => (
                    <div className="col-md-4 mb-4" key={adoption.id}>
                        <AdoptionCard adoption={adoption} /> {/* Ensure AdoptionCard accepts the correct props */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdoptionsPage;
