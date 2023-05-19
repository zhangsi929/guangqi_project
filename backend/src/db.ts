// this file is used to connect to the database
import { Pool } from 'pg';

// Create a PostgreSQL pool
const pool = new Pool({
  user: process.env.DB_USER, // Replace with your PostgreSQL username
  password: process.env.DB_PASSWORD, // Replace with your PostgreSQL password
  host: process.env.DB_HOST, // Replace with your PostgreSQL host
  port: Number(process.env.DB_PORT), // Replace with your PostgreSQL port
  database: process.env.DB_NAME, // Replace with your PostgreSQL database name
});

export default pool;