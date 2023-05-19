import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";
import pool from "../db"; // Update this path according to your actual project structure
import dotenv from "dotenv";
dotenv.config();

const authRouter = express.Router();

const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString("hex"); // Generates a 6-character hexadecimal string
};

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  secure: true,
  secureConnection: false, // TLS requires secureConnection to be false
  tls: {
    ciphers: "SSLv3"
  },
  requireTLS: true,
  port: 465,
  debug: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
} as any);

authRouter.post("/auth/mailcode", async (req, res) => {
  const email = req.body.email;
  const verificationCode = generateVerificationCode();
  const timestamp = new Date();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  };

  const client = await pool.connect();

  try {
    console.log(`Processing verification for email: ${email}`);
    
    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length > 0) {
      if (result.rows[0].is_verified) {
        console.error(`Attempt to re-register email: ${email}`);
        return res.status(400).json({ error: "Email already registered" });
      }

      // Update verification code, timestamp, and last_mail_sent for existing user
      const updateResult = await client.query(
        "UPDATE users SET verification_code = $1, verification_code_timestamp = $2 WHERE email = $3",
        [verificationCode, timestamp, email]
      );

      if (updateResult.rowCount === 0) {
        console.error(`Failed to update user record for email: ${email}`);
        return res.status(500).json({ error: "Failed to update user record" });
      }

      console.log(`Updated user record for email: ${email}`);
    } else {
      // Insert new user with verification code and timestamp
      const insertResult = await client.query(
        "INSERT INTO users (email, verification_code, verification_code_timestamp) VALUES ($1, $2, $3)",
        [email, verificationCode, timestamp]
      );

      if (insertResult.rowCount === 0) {
        console.error(`Failed to insert new user record for email: ${email}`);
        return res.status(500).json({ error: "Failed to insert new user record" });
      }

      console.log(`Inserted new user record for email: ${email}`);
    }

    // Send email
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(`Error sending email to: ${email}, Error: ${error.message}`);
        return res.status(500).json({ error: "Error sending email" });
      } else {
        console.log(`Email sent to: ${email}`);
        return res.status(200).json({ message: "Email sent" });
      }
    });
  } catch (err) {
    console.error(`Database error for email: ${email}, Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    res.status(500).json({ error: "DB error" });
  } finally {
    client.release();
  }
});


authRouter.post("/auth/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const verificationCode = req.body.verificationCode;

  console.log(`Processing signup for email: ${email}`);

  try {
    const client = await pool.connect();

    // Check verification code and timestamp
    const result = await client.query(
      "SELECT verification_code, verification_code_timestamp, is_verified FROM users WHERE email = $1",
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      console.error(`User not found for email: ${email}`);
      return res.status(404).json({ error: "User not found" });
    }

    if (user.verification_code !== verificationCode) {
      console.error(`Invalid verification code for email: ${email}`);
      return res.status(400).json({ error: "Invalid verification code" });
    }

    if (Date.now() - user.verification_code_timestamp > 60000) {
      console.error(`Expired verification code for email: ${email}`);
      return res.status(400).json({ error: "Expired verification code" });
    }

    if (user.is_verified) {
      console.error(`Email already verified for email: ${email}`);
      return res.status(400).json({ error: "Email already verified and registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user with hashed password and set is_verified to true
    await client.query(
      "UPDATE users SET password = $1, is_verified = true WHERE email = $2",
      [hashedPassword, email]
    );

    console.log(`Updated user record with hashed password for email: ${email}`);

    // Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    console.log(`Generated JWT for email: ${email}`);

    res.status(200).json({ token });
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error during signup for email: ${email}, Error: ${err.message}`);
      res.status(500).json({ error: err.message });
    } else {
      console.error(`Unknown error during signup for email: ${email}`);
      res.status(500).json({ error: "Unknown error" });
    }
  }
});



authRouter.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE email = $1 AND is_verified = true",
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        error: "No user found with this email, or the email is not verified",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  } finally {
    client.release();
  }
});

export default authRouter;
