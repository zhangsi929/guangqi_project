CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  verification_code VARCHAR(10),
  verification_code_timestamp TIMESTAMP,
  last_mail_sent TIMESTAMP
);