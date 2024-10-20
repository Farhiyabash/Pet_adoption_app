// src/components/PetCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './PetCard.css'; // Import custom CSS for additional styling

const PetCard = ({ pet }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card pet-card h-100 shadow-sm rounded">
                <img src={pet.imageUrl} alt={pet.name} className="card-img-top pet-image" />
                <div className="card-body">
                    <h5 className="card-title">{pet.name}</h5>
                    <p className="card-text"><strong>Breed:</strong> {pet.breed}</p>
                    <p className="card-text"><strong>Age:</strong> {pet.age} years</p>
                    <p className="card-text"><strong>Description:</strong> {pet.description}</p>
                    <button className="btn btn-primary adopt-button">Adopt Me!</button>
                </div>
            </div>
        </div>
    );
};

PetCard.propTypes = {
    pet: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        breed: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
    }).isRequired,
};

export default PetCard;