import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const dbConnectionstring = process.env.DATABASE_URL;

export const db = new pg.Pool({
  connectionString: dbConnectionstring,
});
