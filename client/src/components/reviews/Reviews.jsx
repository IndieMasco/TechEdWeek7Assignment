// import Footer from "../footer/Footer";
import "./Reviews.css";
import { useState, useEffect } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  // Reviews
  async function getReviewsData() {
    try {
      const response = await fetch(
        "https://techedweek7assignment-1.onrender.com/games-reviews"
      );
      const data = await response.json();
      setReviews(data.reverse());
    } catch (error) {
      console.error("API failed to fetch", error);
    }
  }

  // Interval
  useEffect(() => {
    getReviewsData();
    const reviewsInterval = setInterval(getReviewsData, 3000);
    return () => clearInterval(reviewsInterval);
  }, []);

  // Delete handler
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    // Delete
    try {
      const response = await fetch(
        `https://techedweek7assignment-1.onrender.com/reviews/${reviewId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        getReviewsData();
      }
    } catch (error) {
      console.error("An error occurred while deleting the review:", error);
    }
  };

  return (
    <>
      <h2 className="review-title">Reviews</h2>
      <div className="review-container">
        {reviews.map((review, index) => {
          return (
            <div key={review.id || index} className="card">
              <h3 className="card-title"> {review["Game name"]}</h3>
              <p className="card-name">
                Reviewer's name: {review["Users name"]}
              </p>
              <p className="card-text">Review: {review["User review"]}</p>
              <button
                className="delete-button"
                onClick={() => handleDelete(review.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      {/* <Footer /> */}
    </>
  );
}
