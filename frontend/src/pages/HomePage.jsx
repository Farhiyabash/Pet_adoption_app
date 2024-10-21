// src/components/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import HomeNavbar from '../components/HomeNavbar';
import PetList from '../components/PetList'; // Import the PetList component
import { getUserProfile } from '../services/userService';// Function to fetch user profile data
import { fetchPets } from '../services/PetService';// Function to fetch pets data

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await getUserProfile();
                setUser(profileData);
                const petData = await fetchPets();
                setPets(petData);
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <HomeNavbar />
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={8}>
                        {loading && <p>Loading...</p>}
                        {error && <Alert variant="danger">{error}</Alert>}
                        {user && (
                            <Alert variant="success">
                                Welcome, {user.name}! Here are the available pets for adoption.
                            </Alert>
                        )}
                        <PetList pets={pets} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomePage;