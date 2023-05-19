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

authRouter.post("/mailcode", async (req, res) => {
  console.log("mailcode: received haha");
  const email = req.body.email;
  const verificationCode = generateVerificationCode();
  const timestamp = Date.now();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  };

  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      if (result.rows[0].is_verified) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Update verification code and timestamp for existing user
      await client.query(
        "UPDATE users SET verification_code = $1, verification_code_timestamp = $2 WHERE email = $3",
        [verificationCode, timestamp, email]
      );
    } else {
      // Insert new user with verification code and timestamp
      await client.query(
        "INSERT INTO users (email, verification_code, verification_code_timestamp) VALUES ($1, $2, $3)",
        [email, verificationCode, timestamp]
      );
    }

    // Send email
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(500).json({ error: "Error sending email" });
      } else {
        res.status(200).json({ message: "Email sent" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  } finally {
    client.release();
  }
});

authRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const verificationCode = req.body.verificationCode;

  const client = await pool.connect();

  try {
    // Check verification code and timestamp
    const result = await client.query(
      "SELECT verification_code, verification_code_timestamp, is_verified FROM users WHERE email = $1",
      [email]
    );
    const user = result.rows[0];

    if (
      !user ||
      user.verification_code !== verificationCode ||
      Date.now() - user.verification_code_timestamp > 60000 ||
      user.is_verified
    ) {
      res.status(400).json({
        error: "Invalid or expired verification code or email already verified",
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user with hashed password and set is_verified to true
    await client.query(
      "UPDATE users SET password = $1, is_verified = true WHERE email = $2",
      [hashedPassword, email]
    );

    // Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  } finally {
    client.release();
  }
});

authRouter.post("/login", async (req, res) => {
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
