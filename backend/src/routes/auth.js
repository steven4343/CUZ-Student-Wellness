import { Router } from "express";
import bcrypt from "bcrypt";
import pool from "../db/pool.js";
import { generateToken, authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, password, full_name, student_id } = req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({ error: "Email, password, and full name are required" });
  }

  try {
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (email, password, full_name, student_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, full_name, student_id, role, created_at`,
      [email, hashed, full_name, student_id || null]
    );

    const user = result.rows[0];
    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);
    const { password: _, ...safeUser } = user;

    res.json({ user: safeUser, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/guest", (_req, res) => {
  const guestUser = {
    id: null,
    email: "guest@cuz-wellness.app",
    full_name: "Guest User",
    student_id: null,
    role: "guest",
    created_at: new Date().toISOString(),
  };
  const token = generateToken(guestUser);
  res.json({ user: guestUser, token });
});

router.get("/me", authenticate, async (req, res) => {
  if (req.user.role === "guest") {
    return res.json({
      user: {
        id: null,
        email: "guest@cuz-wellness.app",
        full_name: "Guest User",
        student_id: null,
        role: "guest",
      },
    });
  }
  try {
    const result = await pool.query(
      "SELECT id, email, full_name, student_id, role, created_at FROM users WHERE id = $1",
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
