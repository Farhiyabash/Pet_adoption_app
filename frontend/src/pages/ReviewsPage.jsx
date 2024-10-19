import React, { useEffect, useState } from 'react';
import { getReviews } from '../api'; // Adjust the import path as necessary
import ReviewCard from '../components/ReviewCard'; // A component to display each review
import Spinner from '../components/Spinner'; // A spinner component for loading state
import './ReviewsPage.css'; // Add your CSS file for styling

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getReviews();
                setReviews(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) {
        return <Spinner />; // You can create a spinner component for loading state
    }

    if (error) {
        return <div className="error">Error fetching reviews: {error.message}</div>;
    }

    return (
        <div className="reviews-page">
            <h1>User Reviews</h1>
            {reviews.length === 0 ? (
                <div>No reviews available.</div>
            ) : (
                <div className="reviews-list">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewsPage;
