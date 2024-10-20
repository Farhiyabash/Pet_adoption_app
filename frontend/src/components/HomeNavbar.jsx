import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/api'; // Adjust path if necessary
import { Navbar as BootstrapNavbar, Nav, Container, Form, Button } from 'react-bootstrap';

const HomeNavbar = () => {
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
                        alt="Pet Adoption Logo"
                        style={{ width: '50px', marginRight: '10px' }}
                    />
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Form className="d-flex mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
                        <Form.Control
                            type="search"
                            placeholder="Search pets..."
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-primary">
                            
                        </Button>
                    </Form>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/pets">All Pets</Nav.Link>
                        <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
                        <Nav.Link as={Link} to="/adoptions">Adoptions</Nav.Link>
                        <Nav.Link as={Link} to="/reviews">Reviews</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default HomeNavbar;