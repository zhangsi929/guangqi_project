import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import chatRouter from './routes/chat';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';

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




// test http mode
const isTest = process.env.NODE_ENV === 'production';
if (isTest) {
    app.listen(port, () => {
    console.log(`Server hahaha listening on port ${port}`);
    });
    
} else {
    // SSL Certificate files
    const privateKey = fs.readFileSync('dist/ssl/private.key', 'utf8');
    const certificate = fs.readFileSync('dist/ssl/api_siyuhub_com.crt', 'utf8');
    const ca = [
        fs.readFileSync('dist/ssl/Sectigo_RSA_Domain_Validation_Secure_Server_CA.crt', 'utf8'),
        fs.readFileSync('dist/ssl/USERTrust_RSA_Certification_Authority.crt', 'utf8')
    ];

    // HTTPS server options
    const options = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

    // Start the HTTPS server
    https.createServer(options, app).listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}


