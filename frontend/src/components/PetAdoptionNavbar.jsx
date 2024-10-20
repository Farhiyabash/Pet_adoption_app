// src/components/PetAdoptionNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/api';
import { Navbar as BootstrapNavbar, Nav, Container, Form, Button } from 'react-bootstrap';

const PetAdoptionNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <BootstrapNavbar bg="light" expand="lg">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/">
                    <img
                        src="/logo.png"
                        alt="PetFinder Logo"
                        style={{ width: '50px', marginRight: '10px' }}
                    />
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="navbar-content" />
                <BootstrapNavbar.Collapse id="navbar-content">
                    <Form className="d-flex mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
                        <Form.Control
                            type="search"
                            placeholder="Find your perfect pet..."
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/adoption-requests">My Adoption Requests</Nav.Link>
                        <Nav.Link as={Link} to="/pets">Explore Pets</Nav.Link>
                        <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default PetAdoptionNavbar;
