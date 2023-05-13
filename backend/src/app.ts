import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import chatRouter from './routes/chat';
import dotenv from 'dotenv';
// dotenv.config({ path: __dirname+'/.env' });

dotenv.config();

console.log(process.env.OPENAI_API_KEY);


const app = express();
const port = 3001; // backend port

// Middleware
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', chatRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server hahaha listening on port ${port}`);
});
