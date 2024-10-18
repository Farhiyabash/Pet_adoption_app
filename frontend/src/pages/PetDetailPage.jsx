// src/pages/PetDetailPage.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPetById } from '../redux/petSlice'; // Action to fetch pet details
import AdoptionRequestForm from '../components/AdoptionRequestForm'; // Adoption request form component
import { Modal, Button, Card, Spinner } from 'react-bootstrap'; // Bootstrap components
import formatDate from '../utils/formatDate'; // Utility function to format dates

const PetDetailPage = () => {
    const { petId } = useParams(); // Get pet ID from the URL parameters
    const dispatch = useDispatch();
    const pet = useSelector((state) => state.pets.selectedPet); // Get selected pet from Redux store
    const loading = useSelector((state) => state.pets.loading); // Loading state
    const [showForm, setShowForm] = useState(false); // State to control the display of the adoption request form

    useEffect(() => {
        // Fetch pet details when the component mounts
        dispatch(fetchPetById(petId));
    }, [dispatch, petId]);

    const handleShow = () => setShowForm(true); // Show the adoption request form
    const handleClose = () => setShowForm(false); // Hide the adoption request form

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status" />
                <span className="sr-only">Loading...</span>
            </div>
        ); // Display a loading spinner while fetching data
    }

    if (!pet) {
        return <h2>Pet not found!</h2>; // Display a message if the pet is not found
    }

    return (
        <div className="container mt-4">
            <Card>
                <Card.Img variant="top" src={pet.imageUrl} alt={pet.name} />
                <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                    <Card.Text>
                        <strong>Breed:</strong> {pet.breed}<br />
                        <strong>Age:</strong> {pet.age} years<br />
                        <strong>Gender:</strong> {pet.gender}<br />
                        <strong>Adoption Date:</strong> {formatDate(pet.adoptionDate)}<br />
                        <strong>Description:</strong> {pet.description}
                    </Card.Text>
                    <Button variant="primary" onClick={handleShow}>
                        Request Adoption
                    </Button>
                </Card.Body>
            </Card>

            <Modal show={showForm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adoption Request for {pet.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AdoptionRequestForm petId={pet.id} onClose={handleClose} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PetDetailPage;
