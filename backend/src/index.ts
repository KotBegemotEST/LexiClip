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

// Ñ¨¥?Ñó¥?¥'ÑóÑû healthcheck
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime()
  });
});

// TODO: ¥?¥ZÑïÑø Ñ¨Ñó¥'ÑóÑ¬ Ñ¨ÑóÑïÑ§Ñ¯¥Z¥ÎÑ÷Ñ¬ ¥?Ñó¥Ÿ¥'¥< /auth Ñ÷ /words
// app.use("/words", wordsRouter);

const port = env.PORT;

app.listen(port, () => {
  console.log(`LexiClip backend running on http://localhost:${port}`);
});
