import { Router, Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";

export const authRouter = Router();

authRouter.get("/ping", (_req, res) => {
  res.json({ ok: true });
});

// Схема для тела запроса регистрации
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

// POST /auth/register
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    // 1. Валидация входных данных
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid data",
        details: parsed.error.flatten()
      });
    }

    const { email, password } = parsed.data;

    // 2. Проверяем, что пользователя с таким email ещё нет
    const existing = await prisma.user.findUnique({
      where: { email }
    });

    if (existing) {
      return res.status(409).json({ error: "User with this email already exists" });
    }

    // 3. Хэшируем пароль
    const passwordHash = await bcrypt.hash(password, 10);

    // 4. Создаём пользователя
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash
      }
    });

    // 5. Возвращаем пользователя без passwordHash
    return res.status(201).json({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (err) {
    console.error("[auth/register] error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Временный ping, можно оставить
authRouter.get("/ping", (_req: Request, res: Response) => {
  res.json({ ok: true });
});