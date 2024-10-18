import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPaw, FaStar, FaSignInAlt } from 'react-icons/fa'; // Importing icons from react-icons
import './Navbar.css';  // Import the new CSS file for the Navbar

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">Pet Adoption</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaHome className="icon" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pets">
                <FaPaw className="icon" /> Pets
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reviews">
                <FaStar className="icon" /> Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-primary" to="/login" style={{ marginLeft: '15px' }}>
                <FaSignInAlt className="icon" /> Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
