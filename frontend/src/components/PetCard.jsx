// src/components/PetCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './PetCard.css'; // Import custom CSS for additional styling

const PetCard = ({ pet }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card pet-card h-100 shadow-sm rounded">
                <img 
                    src={pet.imageUrl || 'default-image-url.jpg'} // Fallback for image
                    alt={pet.name || 'Unknown Pet'} 
                    className="card-img-top pet-image" 
                />
                <div className="card-body">
                    <h5 className="card-title">{pet.name || 'Unknown Pet'}</h5>
                    <p className="card-text"><strong>Breed:</strong> {pet.breed || 'Unknown Breed'}</p>
                    <p className="card-text"><strong>Age:</strong> {pet.age ? `${pet.age} years` : 'Age not specified'}</p>
                    <p className="card-text"><strong>Description:</strong> {pet.description || 'No description available.'}</p>
                    <Link to={`/pets/${pet.id}`} className="btn btn-primary adopt-button">View Details</Link>
                </div>
            </div>
        </div>
    );
};

PetCard.propTypes = {
    pet: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        breed: PropTypes.string,
        age: PropTypes.number,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
    }).isRequired,
};

export default PetCard;
