import React from "react";
import styles from './PetAdoption.module.css';

const ReviewComponent = ({ review }) => (
  <div className={styles.card}>
    <h2>Review</h2>
    <p>User: {review.user.name}</p>
    <p>Pet: {review.pet.name}</p>
    <p>Rating: {review.rating} / 5</p>
    <p>Comment: {review.comment}</p>
    <p>Date: {new Date(review.date_created).toLocaleDateString()}</p>
  </div>
);

export default ReviewComponent;