import express from "express";

const router = express.Router();

import { register, login, secret } from "../controllers/auth.js";
import { isAdmin, requireSignin } from "../middlewares/auth.js";

router.post("/register", register);
router.post("/login", login);

router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});
router.get("/secret", requireSignin, isAdmin, secret);

export default router;