/**
 * This file contains the route handler for my chatbot APIs
 */
import express from 'express';
import OpenAI from '../services/OpenApi';
import dotenv from 'dotenv';
dotenv.config(); // why do I need add it here again? I already added it in app.ts file. If I don't add it here, I will get error: OPENAI_API_KEY not defined.


const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const ORGANIZATION_KEY = process.env.ORGANIZATION_KEY

const openai =  (OPENAI_API_KEY && ORGANIZATION_KEY)? new OpenAI(OPENAI_API_KEY, ORGANIZATION_KEY) : null;

if (!openai) {
  throw new Error("OPENAI_API_KEY not defined");
}


router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    // Call the ChatGPT API with the user's message
    const response = await openai.chat(message);

    // Return the API response to the client
    res.json(response);
  } catch (err) {
    console.error('Error processing chatbot API request', JSON.stringify(err));
    res.status(500).send('Internal server error');
  }
});

export default router;

