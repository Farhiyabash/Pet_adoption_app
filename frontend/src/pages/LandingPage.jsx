// src/components/LandingPage.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Optional CSS for styling

const LandingPage = () => {
    return (
        <Container fluid className="landing-page">
            <Row className="justify-content-center align-items-center text-center h-100">
                <Col md={8}>
                    <h1 className="display-4">Welcome to Pet Adoption</h1>
                    <p className="lead">Find your perfect furry friend today!</p>
                    <Link to="/pets">
                        <Button variant="primary" size="lg" className="mt-3">
                            View All Pets
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default LandingPage;
