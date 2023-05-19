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

const openai = (OPENAI_API_KEY && ORGANIZATION_KEY) ? new OpenAI(OPENAI_API_KEY, ORGANIZATION_KEY) : null;

if (!openai) {
  throw new Error("OPENAI_API_KEY not defined");
}


router.post('/chat', async (req, res) => {
  console.log("chat: haha")
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


router.get('/streamChat', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // flush the headers to establish SSE with client
  const prompt = typeof req.query.prompt === 'string' ? req.query.prompt : '';
  const response = openai.client.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
    stream: true,
  }, { responseType: 'stream' });

  response.then(resp => {
    let leftover = ''; // store leftover data from chunked responses
    resp.data.on('data', (data: any) => {
      if (leftover) {
        console.log('Leftover data from previous chunk', leftover);
        console.log('New chunk', data.toString());
      }
      const fullData = leftover + data.toString();
      const lines = fullData.toString().split('\n').filter((line: any) => line.trim() !== '');
      leftover = ''; // reset leftover
      for (const line of lines) {
        const message = line.replace(/^data: /, '');
        if (message === '[DONE]') {
          res.write(`data: AIChatTermination20230514flexva\n\n`)
          res.end();
          return
        }
        try {
          const parsed = JSON.parse(message);
          if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
            res.write(`data: ${parsed.choices[0].delta.content}\n\n`)
          }
        } catch (err) {
          // The line couldn't be parsed as JSON - it's probably a chunked response
          console.log('Error parsing JSON', err);
          console.log('Erro data that can not be parsed is:', message);
          leftover += message;
        }
      }
    });
  }).catch((err: any) => {
    console.log('Error in streamChat', err);
    res.write(`error: ${err}\n\n`)
    res.write(`data: AIChatTermination20230514flexva\n\n`)
    res.end();
  });
})



export default router;

