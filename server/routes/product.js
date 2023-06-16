import express from "express";
import formidable from "express-formidable";

const router = express.Router();

import { isAdmin, requireSignin } from "../middlewares/auth.js";
import {
  create,
  list,
  read,
  photo,
  remove,
  update,
} from "../controllers/product.js";
//formidable() middleware ==> to receive form data (and receive file (img) data)
router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/product", list);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);
router.delete("/product/:productId", requireSignin, isAdmin, remove);
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);

export default router;
