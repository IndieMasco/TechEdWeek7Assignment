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
      <h2>Reviews</h2>
      {reviews.map((review, index) => {
        return (
          <div key={index}>
            <h3>Game name: {review["Game name"]}</h3>
            <p>User name: {review["Users name"]}</p>
            <p>User review: {review["User review"]}</p>
          </div>
        );
      })}
    </>
  );
}
