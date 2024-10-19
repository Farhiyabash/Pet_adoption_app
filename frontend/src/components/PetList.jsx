// src/components/PetList.jsx
import React from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
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

PetList.propTypes = {
    pets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            age: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default PetList;
