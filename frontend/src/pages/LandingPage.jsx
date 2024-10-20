import React from 'react';
import './LandingPage.css'; // Custom CSS for animations and styles
import 'bootstrap/dist/css/bootstrap.min.css';
import pet1 from '../assets/pet1.jpg';
import pet2 from '../assets/pet2.jpg';
import pet3 from '../assets/pet3.jpg';
import pet4 from '../assets/pet4.jpg';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';
import logo4 from '../assets/logo4.png';

const LandingPage = () => {
    // Click handlers for navigation
    const handleAdoptNow = () => {
        // Navigate to the adoption page (replace with your routing logic)
        window.location.href = '/adopt';
    };

    const handleAdoptMe = () => {
        // Navigate to the adoption page or show adoption modal (replace with your routing logic)
        window.location.href = '/adopt';
    };

    const handleSubscribe = (e) => {
        e.preventDefault(); // Prevent default form submission
        const email = e.target.email.value;
        // Handle email subscription logic (e.g., send email to API)
        console.log('Subscribed with email:', email);
    };

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <header className="hero-section text-center">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1 className="animated-text">Find Your New Best Friend</h1>
                        <p className="animated-subtext">Adopt the perfect companion today!</p>
                        <button onClick={handleAdoptNow} className="btn btn-primary btn-lg mt-3">Adopt Now</button>
                    </div>
                </div>
            </header>

            {/* About Us Section */}
            <section className="about-section text-center py-5">
                <div className="container">
                    <h2 className="section-title">About Us</h2>
                    <p className="section-subtitle">
                        We are dedicated to helping pets find loving homes. Our mission is to provide a safe haven for animals and connect them with families.
                    </p>
                </div>
            </section>

            {/* Pets Grid Section */}
            <section className="pets-section py-5 bg-light">
                <div className="container">
                    <h2 className="section-title text-center">Our Pets</h2>
                    <div className="row">
                        {[pet1, pet2, pet3, pet4].map((pet, index) => (
                            <div className="col-md-3 mb-4" key={index}>
                                <div className="card shadow-lg hover-zoom">
                                    <img src={pet} alt={`Pet ${index + 1}`} className="card-img-top pet-image" />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Pet Name {index + 1}</h5>
                                        <p className="card-text">Friendly, playful, and ready to find a home!</p>
                                        <button onClick={handleAdoptMe} className="btn btn-primary">Adopt Me</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section py-5">
                <div className="container">
                    <h2 className="section-title text-center">What Our Clients Say</h2>
                    <div className="testimonials-container d-flex justify-content-around">
                        <div className="testimonial text-center">
                            <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Client 1" className="testimonial-img rounded-circle" />
                            <p>"Adopting from this center changed my life! My dog is the best companion!"</p>
                            <h5>John Bieber</h5>
                        </div>
                        <div className="testimonial text-center">
                            <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Client 2" className="testimonial-img rounded-circle" />
                            <p>"The staff was incredibly helpful and matched me with the perfect pet."</p>
                            <h5>Jane Williams</h5>
                        </div>
                        <div className="testimonial text-center">
                            <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Client 3" className="testimonial-img rounded-circle" />
                            <p>"I can't imagine my life without my furry friend. Thank you!"</p>
                            <h5>Mike Johnson</h5>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Services Section */}
            <section className="services-section py-5 bg-light">
                <div className="container">
                    <h2 className="section-title text-center">Our Services</h2>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <i className="fas fa-heart fa-3x text-primary"></i>
                            <h5 className="mt-3">Pet Adoption</h5>
                            <p>We help match pets with loving families.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="fas fa-paw fa-3x text-primary"></i>
                            <h5 className="mt-3">Veterinary Care</h5>
                            <p>Ensuring the health of your new companion.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="fas fa-bone fa-3x text-primary"></i>
                            <h5 className="mt-3">Pet Supplies</h5>
                            <p>Everything you need for your pet’s happiness.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="companies-section py-5 text-center">
                <div className="container">
                    <h2 className="section-title">Our Partners</h2>
                    <div className="logos-container d-flex justify-content-around align-items-center">
                        {[logo1, logo2, logo3, logo4].map((logo, index) => (
                            <img key={index} src={logo} alt={`Company Logo ${index + 1}`} className="company-logo" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section text-center py-5">
                <div className="container">
                    <h2 className="section-title">Stay Updated</h2>
                    <p>Subscribe to our newsletter for the latest updates and pet adoption news!</p>
                    <form className="newsletter-form d-flex justify-content-center" onSubmit={handleSubscribe}>
                        <input type="email" name="email" className="form-control" placeholder="Enter your email" required />
                        <button type="submit" className="btn btn-primary ml-2">Subscribe</button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-section text-center py-4">
                <p>&copy; 2024 Pet Adoption Center. All Rights Reserved.</p>
                <ul className="social-icons d-flex justify-content-center">
                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                </ul>
            </footer>
        </div>
    );
};

export default LandingPage;
