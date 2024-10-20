import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons'; // Importing a paw icon
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <BootstrapNavbar bg="light" expand="lg" sticky="top">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faPaw} className="me-2" /> 
                    Pet Adoption
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
