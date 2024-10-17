import React from 'react';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Pet Adoption</h1>
      <p>Find your perfect pet today!</p>
      
      <section id="about" className="mt-5">
        <h2>About Us</h2>
        <p>We are dedicated to connecting loving pets with caring owners. Our mission is to ensure every pet finds a happy home.</p>
      </section>

      <section id="contact" className="mt-5">
        <h2>Contact Us</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
