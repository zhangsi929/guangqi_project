import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import chatRouter from './routes/chat';
import dotenv from 'dotenv';
// dotenv.config({ path: __dirname+'/.env' });

dotenv.config();

console.log(process.env.OPENAI_API_KEY);


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', chatRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
