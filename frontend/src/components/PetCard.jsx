// src/components/PetCard.jsx
import React from 'react';
import { Card, Col } from 'react-bootstrap';

const PetCard = ({ pet }) => {
    return (
        <Col md={4} className="mb-4">
            <Card>
                <Card.Img variant="top" src={pet.image} alt={pet.name} />
                <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                    <Card.Text>
                        <strong>Breed:</strong> {pet.breed}<br />
                        <strong>Age:</strong> {pet.age} years<br />
                        <strong>Description:</strong> {pet.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default PetCard;
