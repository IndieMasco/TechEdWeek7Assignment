// import Footer from "../footer/Footer";
import "./Form.css";
import { useState, useEffect } from "react";

export default function Form() {
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    gamesid: "",
    name: "",
    review: "",
  });

  // Fetch list of games
  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch(import.meta.env.VITE_SOME_KEY + "/games");
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

  // Handles input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handles form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Checks if a game has been selected
    if (!formData.gamesid) {
      alert("Please select a game to review.");
      return;
    }

    // Handles POST request to server
    try {
      const response = await fetch(
        "https://techedweek7assignment.onrender.com/add-reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
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
    <>
      <h2 className="form-title">Form</h2>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <legend className="legend">What game are you reviewing?</legend>
            <label className="lable" htmlFor="gamesid">
              Game Name
            </label>
            <select
              className="game-list"
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

          <fieldset className="fieldset">
            <legend className="legend">Write your review</legend>
            <label className="lable" htmlFor="name">
              Your Name
            </label>
            <input
              className="name-box"
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <label className="lable" htmlFor="review">
              Review
            </label>
            <textarea
              className="text-box"
              id="review"
              name="review"
              required
              rows="4"
              value={formData.review}
              onChange={handleInputChange}
            ></textarea>
          </fieldset>
          <button className="button" type="submit">
            Submit Review
          </button>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
}
