// Basic set up
import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8080;
app.listen(PORT, function () {
  console.info(` Server is running in port ${PORT}`);
});

app.get("/", (_, res) => {
  res.send("Welcome");
});

//==========================================

// Read data from games table
app.get("/games", async (_, res) => {
  try {
    const data = await db.query(`SELECT id, name FROM games;`);
    res.json(data.rows);
  } catch (error) {
    console.error("Error in games route!", error);
    res.status(500).json({ success: false });
  }
});

// Read data from reviews table
app.get("/review", async (_, res) => {
  try {
    const data = await db.query(`SELECT name, review FROM review;`);
    res.json(data.rows);
  } catch (error) {
    console.error("Error in review route!", error);
    res.status(500).json({ success: false });
  }
});

// Read data from games and review
app.get("/games-reviews", async (_, res) => {
  try {
    const data = await db.query(`
      SELECT 
        review.id,
        games.name AS "Game name", 
        review.name AS "Users name", 
        review.review AS "User review"
      FROM review 
      JOIN games ON games.id = review.games_id;`);
    res.json(data.rows);
  } catch (error) {
    console.error("Error in the game-reviews route!", error);
    res.status(500).json({ success: false });
  }
});

// Create new data in reviews table
app.post("/add-reviews", (req, res) => {
  const { name, review, gamesid } = req.body;
  try {
    const query = db.query(
      `INSERT INTO review (name, review, games_id) VALUES ($1, $2, $3);`,
      [name, review, gamesid]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in add-reviews route", error);
    res.status(500).json({ success: false });
  }
});

// === 🏹 STRETCH GOALS 🏹 ===

// - 🏹 Allow users to delete posts

// Delete a review
app.delete("/reviews/:id", async (req, res) => {
  const reviewId = req.params.id;
  try {
    const result = await db.query(`DELETE FROM review WHERE id = $1;`, [
      reviewId,
    ]);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found." });
    }
    res.status(200).json({ success: true, message: "Review deleted!" });
  } catch (error) {
    console.error("Error in delete review route", error);
    res.status(500).json({ success: false });
  }
});

// - 🏹 Create additional SQL queries to show filtered posts

// Users names
app.get("/reviewers", async (_, res) => {
  try {
    const data = await db.query(`SELECT DISTINCT name FROM review;`);
    res.json(data.rows.map((row) => row.name));
  } catch (error) {
    console.error("Error in reviewers route!", error);
    res.status(500).json({ success: false });
  }
});

// Review texts
app.get("/just-reviews", async (_, res) => {
  try {
    // SQL: Select only the review column
    const data = await db.query(`SELECT review FROM review;`);
    res.json(data.rows.map((row) => row.review));
  } catch (error) {
    console.error("Error in just-reviews route!", error);
    res.status(500).json({ success: false });
  }
});

// Reviews Sam
app.get("/reviews/user/sam", async (_, res) => {
  try {
    const data = await db.query(`
      SELECT 
        review.id, 
        review.name AS "Reviewer Name", 
        review.review AS "Review Text", 
        games.name AS "Game Reviewed"
      FROM review
      JOIN games ON games.id = review.games_id
      WHERE review.name = 'Sam';
    `);
    res.json(data.rows);
  } catch (error) {
    console.error("Error in reviews/user/sam route!", error);
    res.status(500).json({ success: false });
  }
});
