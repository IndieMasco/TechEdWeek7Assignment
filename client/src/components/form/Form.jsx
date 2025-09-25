import "./Form.css";

import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    gamename: "",
    name: "",
    review: "",
  });

  // Handles the input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handles the form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/add-reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({
          gamename: "",
          name: "",
          review: "",
        });
      } else {
        console.error("Failed to submit the review.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>What game are you reviewing?</legend>
          <label htmlFor="gamename">Game Name</label>
          <input
            type="text"
            id="gamename"
            name="gamename"
            required
            value={formData.gamename}
            onChange={handleInputChange}
          />
        </fieldset>
        <fieldset>
          <legend>Write your review</legend>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            name="review"
            required
            rows="4"
            value={formData.review}
            onChange={handleInputChange}
          ></textarea>
        </fieldset>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
