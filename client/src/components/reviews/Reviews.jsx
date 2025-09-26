import "./Reviews.css";

import { useState, useEffect } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviewsData() {
      try {
        const response = await fetch("http://localhost:8080/games-reviews");
        const data = await response.json();
        setReviews(data.reverse());
      } catch (error) {
        console.error("API failed to fetch", error);
      }
    }
    getReviewsData();
    const reviewsInterval = setInterval(getReviewsData, 3000);
    return () => clearInterval(reviewsInterval);
  }, []);

  return (
    <>
      <h2 className="rev-title">Reviews</h2>
      <div className="review-container">
        {reviews.map((review, index) => {
          return (
            <div key={index} className="review-card">
              <h3 className="review-title"> {review["Game name"]}</h3>
              <p className="review-name">
                Reviewer's name: {review["Users name"]}
              </p>
              <p className="review-text">Review: {review["User review"]}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
