// src/components/AdoptionCard.jsx
import React from 'react';

const AdoptionCard = ({ adoption }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{adoption.pet_name}</h5> {/* Adjust based on your data */}
                <p className="card-text">Requested by: {adoption.user_name}</p>
                <p className="card-text">Status: {adoption.status}</p>
                {/* Add more details as needed */}
            </div>
        </div>
    );
};

export default AdoptionCard;
