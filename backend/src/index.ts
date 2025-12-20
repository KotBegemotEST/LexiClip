import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { authRouter } from "./routes/auth.routes";

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRouter);

// Healthcheck
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime()
  });
});

// TODO: add words routes
// app.use("/words", wordsRouter);

const port = env.PORT;

app.listen(port, () => {
  console.log(`LexiClip backend running on http://localhost:${port}`);
});
