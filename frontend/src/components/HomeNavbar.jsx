import React from 'react';
import { Link } from 'react-router-dom';

const HomeNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container-fluid">
                {/* Logo linking to the homepage */}
                <Link className="navbar-brand" to="/">
                    <img
                        src="/logo.png"
                        alt="Pet Adoption Logo"
                        style={{ width: '50px', marginRight: '10px' }}
                    />
                </Link>

                {/* Hamburger button for mobile view */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Search bar */}
                    <form className="d-flex mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search pets..."
                            aria-label="Search"
                            style={{
                                borderRadius: '20px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <button className="btn btn-outline-primary" type="submit">
                            Search
                        </button>
                    </form>

                    {/* Navbar links */}
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/pets" style={{ color: '#17a2b8' }}>
                                All Pets
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/favorites" style={{ color: '#17a2b8' }}>
                                Favorites
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adoptions" style={{ color: '#17a2b8' }}>
                                Adoptions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reviews" style={{ color: '#17a2b8' }}>
                                Reviews
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout" style={{ color: '#17a2b8' }}>
                                Logout
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="/profile"
                                id="profileDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ color: '#17a2b8' }}
                            >
                                <i className="fas fa-user-circle" style={{ fontSize: '24px' }}></i>
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/profile">
                                        View Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/logout">
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default HomeNavbar;
