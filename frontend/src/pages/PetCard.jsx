// src/components/PetCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PetCard = ({ pet }) => {
    return (
        <Card className="mb-3">
            <Card.Img variant="top" src={pet.imageUrl} alt={pet.name} />
            <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>
                    <strong>Age:</strong> {pet.age} years
                </Card.Text>
                <Card.Text>
                    <strong>Description:</strong> {pet.description}
                </Card.Text>
                <Button variant="primary">Adopt</Button>
            </Card.Body>
        </Card>
    );
};

PetCard.propTypes = {
    pet: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
    }).isRequired,
};

export default PetCard;
