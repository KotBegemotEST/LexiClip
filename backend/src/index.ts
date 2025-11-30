import express from "express";
import cors from "cors";
import { env } from "./config/env";

const app = express();

// базовые middlewares
app.use(cors());
app.use(express.json());

// простой healthcheck
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime()
  });
});

// TODO: сюда потом подключим роуты /auth и /words
// app.use("/auth", authRouter);
// app.use("/words", wordsRouter);

const port = env.PORT;

app.listen(port, () => {
  console.log(`LexiClip backend running on http://localhost:${port}`);
});
