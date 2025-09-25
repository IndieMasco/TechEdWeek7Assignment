// Imports
import pg from "pg";
import dotenv from "dotenv";

// Config dotenv
dotenv.config();

// Set up a pool with pg
const dbConnectionString = process.env.DATABASE_URL;

export const db = new pg.Pool({
  connectionString: dbConnectionString,
});
