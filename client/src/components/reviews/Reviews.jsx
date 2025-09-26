import "./Reviews.css";

import { useState, useEffect } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviewsData() {
      try {
        const response = await fetch(
          import.meta.env.VITE_SOME_KEY + "/games-reviews"
        );
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
      <h2 className="review-title">Reviews</h2>
      <div className="review-container">
        {reviews.map((review, index) => {
          return (
            <div key={index} className="card">
              <h3 className="card-title"> {review["Game name"]}</h3>
              <p className="card-name">
                Reviewer's name: {review["Users name"]}
              </p>
              <p className="card-text">Review: {review["User review"]}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
