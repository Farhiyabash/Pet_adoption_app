import React from 'react';

const Reviews = () => {
  return (
    <div className="container">
      <h1>Reviews</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="review" className="form-label">Your Review</label>
          <textarea className="form-control" id="review" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Reviews;
