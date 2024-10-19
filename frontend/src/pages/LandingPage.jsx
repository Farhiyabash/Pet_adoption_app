// src/components/LandingPage.jsx
import React from 'react';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Ensure this file contains necessary styles

const LandingPage = () => {
    return (
        <Container fluid className="landing-page">
            {/* Carousel Section */}
            <Carousel className="my-4" interval={3000} fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-image"
                        src="https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHBldHxlbnBnfGVufDB8fHx8MTY4NTI0NzMwNw&ixlib=rb-4.0.3&q=80&w=1080" // 4K image of a dog
                        alt="Dog"
                    />
                    <Carousel.Caption>
                        <h3>Find Your Best Friend</h3>
                        <p>Discover a loving pet waiting for you!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-image"
                        src="https://images.unsplash.com/photo-1603214148700-1014e702b4cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIyfHxjYXR8ZW58MHx8fHwxNjg1MjQ3MzA3&ixlib=rb-4.0.3&q=80&w=1080" // 4K image of a cat
                        alt="Cat"
                    />
                    <Carousel.Caption>
                        <h3>Adopt, Don't Shop</h3>
                        <p>Join us in making a difference in pets' lives.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-image"
                        src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE1fHxwZXQlMjBhZG9wdGVyfGVufDB8fHx8MTY4NTI0NzMwNw&ixlib=rb-4.0.3&q=80&w=1080" // 4K image of a dog and cat together
                        alt="Dog and Cat Together"
                    />
                    <Carousel.Caption>
                        <h3>Love Awaits</h3>
                        <p>Every pet deserves a forever home.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-image"
                        src="https://images.unsplash.com/photo-1583502023164-5f5ff8c0a5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxwZXQlMjBhbmltYWwlMjBmb3J8ZW58MHx8fHwxNjg1MjQ3MzA3&ixlib=rb-4.0.3&q=80&w=1080" // 4K image of a playful puppy
                        alt="Playful Puppy"
                    />
                    <Carousel.Caption>
                        <h3>Adopt Your Furry Friend</h3>
                        <p>Find joy in adopting a pet today!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-image"
                        src="https://images.unsplash.com/photo-1561948952-4f53db2227b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEzfHxwZXQlMjBpbWFnZXxlbnBnfGVufDB8fHx8MTY4NTI0NzMwNw&ixlib=rb-4.0.3&q=80&w=1080" // 4K image of a cat
                        alt="Cute Cat"
                    />
                    <Carousel.Caption>
                        <h3>Make a Difference</h3>
                        <p>Help us give every pet a loving home.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* Main Content Section */}
            <Row className="justify-content-center text-center">
                <Col md={8}>
                    <h1 className="display-4">Welcome to Pet Adoption</h1>
                    <p className="lead">Find your perfect furry friend today!</p>
                    <Link to="/pets">
                        <Button variant="success" size="lg" className="mt-3">
                            View All Pets
                        </Button>
                    </Link>
                </Col>
            </Row>

            {/* Cards Section */}
            <Row className="mt-5">
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1516589182007-43c3bb5f7c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHBldHxlbnBnfGVufDB8fHx8MTY4NTI0NzMwNw&ixlib=rb-4.0.3&q=80&w=1080" />
                        <Card.Body>
                            <Card.Title>About Us</Card.Title>
                            <Card.Text>
                                We are dedicated to helping you find your new best friend. Our mission is to
                                ensure every pet finds a loving home.
                            </Card.Text>
                            <Link to="/about">
                                <Button variant="link">Learn More</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1613267380786-f7b92fc80ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIyfHxjYXR8ZW58MHx8fHwxNjg1MjQ3MzA3&ixlib=rb-4.0.3&q=80&w=1080" />
                        <Card.Body>
                            <Card.Title>Contact Us</Card.Title>
                            <Card.Text>
                                Have questions? We're here to help! Reach out to us anytime.
                            </Card.Text>
                            <Link to="/contact">
                                <Button variant="link">Get in Touch</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Img variant="top" src="https://images.unsplash.com/photo-1601615840751-d99a8bc5103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxwZXQlMjBhZG9wdGVyfGVufDB8fHx8MTY4NTI0NzMwNw&ixlib=rb-4.0.3&q=80&w=1080" />
                        <Card.Body>
                            <Card.Title>Testimonials</Card.Title>
                            <Card.Text>
                                Hear from our happy adopters! Their stories inspire us every day.
                            </Card.Text>
                            <Link to="/testimonials">
                                <Button variant="link">Read Stories</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LandingPage;
