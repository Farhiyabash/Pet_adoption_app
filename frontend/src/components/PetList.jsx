// src/components/PetList.jsx
import React from 'react';
import { Row } from 'react-bootstrap';
import PetCard from './PetCard';

const PetList = ({ pets }) => {
    return (
        <Row>
            {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
            ))}
        </Row>
    );
};

export default PetList;
