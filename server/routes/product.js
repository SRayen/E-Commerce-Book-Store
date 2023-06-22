import express from "express";
/* Formidable is a Node.js module for parsing form data, including 
multipart/form-data file upload. */
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
  filteredProducts,
  productsCount,
  listProducts
} from "../controllers/product.js";
//formidable() middleware ==> to receive form data (and receive file (img) data)
router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);
router.delete("/product/:productId", requireSignin, isAdmin, remove);
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);
router.post("/filtered-products", filteredProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);

export default router;
