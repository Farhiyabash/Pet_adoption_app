// src/components/PetList.jsx
import React from 'react';
import PetCard from './PetCard';
import '../styles/PetList.css'; // Custom CSS for PetList styling

const PetList = ({ pets }) => {
    return (
        <div className="pet-list">
            <div className="row">
                {pets.map((pet) => (
                    <div className="col-md-4 mb-4" key={pet.id}>
                        <PetCard pet={pet} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetList;
