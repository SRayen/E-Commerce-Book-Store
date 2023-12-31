//To use import ==> add in package.json : "type":"module"
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import morgan from "morgan";
import cors from "cors";

dotenv.config();
const app = express();

//DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error=>", err));

//middlewares
app.use(
  cors({
    origin: ["http://localhost:3000"],
    //Enable sending credentials (back => front)
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

//Router middleware
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});
