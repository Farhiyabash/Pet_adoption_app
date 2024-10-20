// src/components/Alert.jsx

import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message }) => {
    return (
        <div className="alert">
            <p>{message}</p>
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Alert;
