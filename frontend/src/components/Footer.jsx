// src/components/Footer.jsx

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Using Bootstrap for layout and styling
import { Link } from 'react-router-dom'; // For navigation links

const Footer = () => {
    return (
        <footer className="bg-dark text-light mt-5">
            <Container>
                <Row className="py-4">
                    <Col md={4} className="text-center">
                        <h5>About Us</h5>
                        <p>
                            We are dedicated to helping pets find loving homes. Our platform connects potential adopters with pets in need of families.
                        </p>
                    </Col>
                    <Col md={4} className="text-center">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/" className="text-light">Home</Link>
                            </li>
                            <li>
                                <Link to="/profile" className="text-light">Profile</Link>
                            </li>
                            <li>
                                <Link to="/adoption-requests" className="text-light">My Adoption Requests</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col md={4} className="text-center">
                        <h5>Contact Us</h5>
                        <p>
                            Have questions? Reach out to us at{' '}
                            <a href="mailto:info@petadoption.com" className="text-light">info@petadoption.com</a>
                        </p>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <p className="mb-0">&copy; {new Date().getFullYear()} Pet Adoption. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
