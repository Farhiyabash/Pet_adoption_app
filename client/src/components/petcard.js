import React from 'react';

const PetCard = ({ pet }) => {
    return (
        <div className="pet-card">
            <img src={pet.image_url} alt={pet.name} className="pet-image" />
            <h3>{pet.name}</h3>
            <p><strong>Age:</strong> {pet.age} years</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Description:</strong> {pet.description}</p>
            <p><strong>Status:</strong> {pet.status}</p>
            <button className="adopt-button">Adopt</button>
        </div>
    );
};

export default PetCard;
