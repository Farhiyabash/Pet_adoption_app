// src/components/Spinner.jsx

import React from 'react';
import './Spinner.css'; // Make sure to create appropriate styles for the spinner

const Spinner = () => {
    return (
        <div className="spinner">
            <div className="loader"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Spinner;
