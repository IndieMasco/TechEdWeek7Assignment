import "./Form.css";

import { useState, useEffect } from "react";

export default function Form() {
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    gamesid: "",
    name: "",
    review: "",
  });

  // Fetch the list of games
  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch("http://localhost:8080/games");
        if (response.ok) {
          const data = await response.json();
          setGames(data);
        }
      } catch (error) {
        console.error("An error occurred while fetching games:", error);
      }
    }
    fetchGames();
  }, []);

  // Handles the input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handles the form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Checks if a game has been selected
    if (!formData.gamesid) {
      alert("Please select a game to review.");
      return;
    }

    // End point for submitted form
    try {
      const response = await fetch("http://localhost:8080/add-reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData((prev) => ({
          ...prev,
          name: "",
          review: "",
        }));
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Form
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>What game are you reviewing?</legend>
          <label htmlFor="gamesid">Game Name</label>
          <select
            id="gamesid"
            name="gamesid"
            required
            value={formData.gamesid}
            onChange={handleInputChange}
          >
            {games.length > 0 && (
              <option value="" disabled>
                Select a Game
              </option>
            )}
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </select>
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
