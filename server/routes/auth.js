import express from "express";

const router = express.Router();

import {
  register,
  login,
  updateProfile,

} from "../controllers/auth.js";
import { isAdmin, requireSignin } from "../middlewares/auth.js";

router.post("/register", register);
router.post("/login", login);

router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});

router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ ok: true });
});

router.put("/profile", requireSignin, updateProfile);



export default router;
