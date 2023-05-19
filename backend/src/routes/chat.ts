import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import OpenAI from "../services/OpenApi";
import dotenv from "dotenv";

// Load environment variables.
dotenv.config();

const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ORGANIZATION_KEY = process.env.ORGANIZATION_KEY;

const openai =
  OPENAI_API_KEY && ORGANIZATION_KEY
    ? new OpenAI(OPENAI_API_KEY, ORGANIZATION_KEY)
    : null;

if (!openai) {
  throw new Error("OPENAI_API_KEY not defined");
}

interface RequestWithAuthData extends Request {
  authData?: any;
}

const verifyToken = (
  req: RequestWithAuthData,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, JWT_SECRET, (err, authData) => {
      if (err) {
        console.log(
          `[${new Date().toISOString()}] Unauthorized request to ${req.url}`
        );
        res.sendStatus(403);
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    console.log(
      `[${new Date().toISOString()}] Unauthorized request to ${req.url}`
    );
    res.sendStatus(403);
  }
};

router.post(
  "/chat",
  verifyToken,
  async (req: RequestWithAuthData, res: Response) => {
    try {
      const { message } = req.body;
      const response = await openai.chat(message);

      console.log(`[${new Date().toISOString()}] Chat response:`, response);

      res.json(response);
    } catch (err) {
      console.error(
        `[${new Date().toISOString()}] Error processing chatbot API request:`,
        err
      );
      res.status(500).send("Internal server error");
    }
  }
);

router.get("/streamChat", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const prompt = typeof req.query.prompt === "string" ? req.query.prompt : "";

  const response = openai.client.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
      stream: true,
    },
    { responseType: "stream" }
  );

  response
    .then((resp) => {
      let leftover = "";

      resp.data.on("data", (data: any) => {
        if (leftover) {
          console.log(
            `[${new Date().toISOString()}] Leftover data from previous chunk:`,
            leftover
          );
        }

        const fullData = leftover + data.toString();
        const lines = fullData
          .split("\n")
          .filter((line: any) => line.trim() !== "");
        leftover = "";

        for (const line of lines) {
          const message = line.replace(/^data: /, "");
          if (message === "[DONE]") {
            res.write(`data: AIChatTermination20230514flexva\n\n`);
            res.end();
            return;
          }

          try {
            const parsed = JSON.parse(message);
            if (
              parsed.choices &&
              parsed.choices[0] &&
              parsed.choices[0].delta &&
              parsed.choices[0].delta.content
            ) {
              res.write(`data: ${parsed.choices[0].delta.content}\n\n`);
            }
          } catch (err) {
            console.error(
              `[${new Date().toISOString()}] Error parsing JSON:`,
              err
            );
            leftover += message;
          }
        }
      });
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        console.error(
          `[${new Date().toISOString()}] Error in streamChat:`,
          err.message
        );
      } else {
        console.error(
          `[${new Date().toISOString()}] Error in streamChat:`,
          err
        );
      }
      res.write(`error: ${JSON.stringify(err)}\n\n`);
      res.write(`data: AIChatTermination20230514flexva\n\n`);
      res.end();
    });
});

export default router;
