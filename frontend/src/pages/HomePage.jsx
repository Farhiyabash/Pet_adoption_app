import React from 'react';
import HomeNavbar from '../components/HomeNavbar'; // Home specific navbar

const HomePage = () => {
    return (
        <div>
            <HomeNavbar />
            <h1>Available Pets for Adoption</h1>
            <p>List of pets will be displayed here.</p>
            {/* Here you can map through your pets data and display them */}
        </div>
    );
};

export default HomePage;
