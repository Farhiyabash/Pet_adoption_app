// src/components/Alert.jsx

import React from 'react';

const Alert = ({ message }) => {
    return (
        <div className="alert alert-danger">
            <strong>Error!</strong> {message}
        </div>
    );
};

export default Alert;
