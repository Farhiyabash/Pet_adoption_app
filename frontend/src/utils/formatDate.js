// src/utils/formatDate.js

/**
 * Formats a date string into a more human-readable format.
 * @param {string | Date} date - The date to format (can be a date string or a Date object).
 * @returns {string} - Formatted date string.
 */
export const formatDate = (date) => {
    if (!date) return '';

    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false // Use 24-hour format
    };
  
    // Convert to Date object if the input is a string
    const dateObject = typeof date === 'string' ? new Date(date) : date;

    return dateObject.toLocaleString('en-US', options);
};
