import express from "express";
const router = express.Router();

import { isAdmin, requireSignin } from "../middlewares/auth.js";
import { create, update,remove, list  } from "../controllers/category.js";

router.post('/category', requireSignin , isAdmin , create)
router.put('/category', requireSignin , isAdmin , update)
router.delete('/category/:categoryId', requireSignin , isAdmin , remove)
router.get('/categories', list)

export default router