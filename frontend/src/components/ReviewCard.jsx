// ReviewCard.jsx
import React from 'react';
import './ReviewCard.css'; // Add your CSS file for styling

const ReviewCard = ({ review }) => {
    return (
        <div className="review-card">
            <h3>{review.user.name}</h3> {/* Assuming review contains user data */}
            <p>{review.content}</p>
            <p>Rating: {review.rating}</p>
            <p>{new Date(review.createdAt).toLocaleDateString()}</p> {/* Adjust based on your date format */}
        </div>
    );
};

export default ReviewCard;
