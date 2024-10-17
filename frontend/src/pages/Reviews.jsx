import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Reviews.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const petId = 1; // Replace with actual pet ID

  // Updated emojis array with more options
  const emojis = ['😊', '😍', '🔥', '❤️', '😢', '😡', '😂', '✨', '👍', '🎉'];

  useEffect(() => {
    const fetchReviewsAndUsers = async () => {
      try {
        const [reviewsResponse, usersResponse] = await Promise.all([
          fetch('http://127.0.0.1:5000/reviews'),
          fetch('http://127.0.0.1:5000/users'),
        ]);

        if (!reviewsResponse.ok || !usersResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const reviewsData = await reviewsResponse.json();
        const usersData = await usersResponse.json();

        const initializedReviews = reviewsData.map((review) => ({
          ...review,
          likes: review.likes || 0,
          liked: false,
        }));

        setReviews(initializedReviews);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching reviews or users:', error);
        setError('Could not load reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsAndUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewContent.trim()) {
      setError('Review content cannot be empty.');
      return;
    }

    // Check if users array is empty before attempting to pick a random user
    if (users.length === 0) {
      setError('No users available to submit a review.');
      return;
    }

    // Randomly select a user from the list of users
    const randomUserId = users[Math.floor(Math.random() * users.length)].id;

    const newReview = {
      content: reviewContent,
      rating: reviewRating,
      user_id: randomUserId, // Use random user ID
      pet_id: petId,
      likes: 0,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setReviews((prevReviews) => [...prevReviews, { ...data, liked: false }]);
      setReviewContent('');
      setReviewRating(5);
      setError(null);
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Could not submit review.');
    }
  };

  const handleLikeClick = async (reviewId) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        const newLikedStatus = !review.liked;
        return {
          ...review,
          likes: newLikedStatus ? (review.likes || 0) + 1 : (review.likes || 0) - 1,
          liked: newLikedStatus,
        };
      }
      return review;
    });

    setReviews(updatedReviews);

    try {
      await fetch(`http://127.0.0.1:5000/reviews/${reviewId}/like`, {
        method: 'PATCH',
      });
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('Could not delete review.');
    }
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible((prev) => !prev);
  };

  const addEmoji = (emoji) => {
    setReviewContent((prevContent) => prevContent + emoji);
    setEmojiPickerVisible(false); // Close the picker after selecting an emoji
  };

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="container">
      <h1 className="my-4">Reviews from Our Users"</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="review" className="form-label">Your Review</label>
          <div className="input-group">
            <ReactQuill
              value={reviewContent}
              onChange={setReviewContent}
              theme="snow"
              modules={{ toolbar: false }}
              className="review-input flex-grow-1"
            />
            <div className="emoji-container">
              <button type="button" className="btn btn-light emoji-btn" onClick={toggleEmojiPicker}>
                😊 {/* Default emoji shown */}
              </button>
              {emojiPickerVisible && (
                <div className="emoji-picker">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="emoji-option"
                      onClick={() => addEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Your Rating (1-5)</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            min="1"
            max="5"
            value={reviewRating}
            onChange={(e) => setReviewRating(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="reviews-list mt-4">
        <h2>Existing Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => {
            const user = users.find((user) => user.id === review.user_id);
            return (
              <div key={review.id} className="review mb-4 p-3 border rounded">
                <div dangerouslySetInnerHTML={{ __html: review.content }} />
                <p>
                  <small>
                    Rating: {review.rating} | By: {user ? user.name : 'Anonymous'}
                  </small>
                </p>
                <div className="review-actions">
                  <button
                    className={`btn ${review.liked ? 'btn-success' : 'btn-outline-success'} me-2`}
                    onClick={() => handleLikeClick(review.id)}
                  >
                    <i className="fas fa-thumbs-up"></i> {review.likes}
                  </button>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Reviews;
