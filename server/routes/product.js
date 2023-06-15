import express from "express";
import formidable from 'express-formidable'

const router = express.Router();

import { isAdmin, requireSignin } from "../middlewares/auth.js";
import { create } from "../controllers/product.js";
//formidable() middleware ==> to receive form data
router.post('/product', requireSignin , isAdmin , formidable(), create)

export default router