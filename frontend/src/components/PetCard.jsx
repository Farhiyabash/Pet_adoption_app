// src/components/PetCard.jsx
import React from 'react';
import '../styles/PetCard.css'; // Custom CSS for PetCard styling

const PetCard = ({ pet }) => {
    return (
        <div className="pet-card">
            <img src={pet.image} alt={pet.name} className="pet-card-img" />
            <div className="pet-card-body">
                <h5 className="pet-card-title">{pet.name}</h5>
                <p className="pet-card-description">{pet.description}</p>
                <p className="pet-card-breed"><strong>Breed:</strong> {pet.breed}</p>
                <p className="pet-card-age"><strong>Age:</strong> {pet.age} years</p>
            </div>
        </div>
    );
};

export default PetCard;
