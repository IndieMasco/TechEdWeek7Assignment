// Basic set up
import express from "express";
import cors from "cors";
// import { db } from "./dbConnection.js";

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

// Read data from my games table
app.get("/games", async (_, res) => {
  try {
    const data = await db.query(`SELECT name FROM games;`);
    res.json(data.rows);
  } catch (error) {
    console.error("Error in games route!", error);
    res.status(500).json({ success: fales });
  }
});

// Read data from my reviews table
app.get("/reviews", async (_, res) => {
  try {
    const data = await db.query(`SELECT name FROM reviews;`);
    res.json(data.rows);
  } catch (error) {
    console.error("Error in reviews route!", error);
    res.status(500).json({ success: fales });
  }
});

// Read data from the games and review
app.get("/games-reviews", async (_, res) => {
  try {
    const data = await db.query(`
    SELECT games.name AS "Game name", review.name AS "Users name", review.review AS "User review"
    FROM review JOIN games ON games.id = review.games_id;`);
    res.json(data.rows);
  } catch (error) {
    console.error("Error in the game-reviews route!", error);
    res.status(500).json({ success: fales });
  }
});

// Create new data in the reviews table
app.post("/add-reviews", (req, res) => {
  const { name, review, gamesid } = req.body; // THIS IS THE BODY
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

// Delete an entry from my review table
app.delete("/delete-review/:id", (req, res) => {
  try {
    const paramsId = req.params.id;
    const query = db.query(`DELETE FROM review WHERE id = $1 RETURNING*;`, [
      paramsId,
    ]);
  } catch (error) {
    console.error("error in the delete-review route", error);
    res.status(500).json({ success: false });
  }
});
