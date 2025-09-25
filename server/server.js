// Imports
import express from "express";
import cors from "cors";
// import { db } from "./dbConnection.js";

// Initialise ecpress
const app = express();
// Config express with Json
app.use(express.json());
// Congif cors inexpress
app.use(cors());

// Set up a port
const PORT = 8080;
app.listen(PORT, function () {
  console.info(` Server is running in port ${PORT}`);
});

// Root route
app.get("/", (_, res) => {
  res.send("Welcome");
});
