//To use import ==> add in package.json : "type":"module"
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import { comparePassword, hashPassword } from "./helpers/auth.js";
import morgan from "morgan";

dotenv.config();
const app = express();

//DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error=>", err));

//middlewares
app.use(morgan("dev"));
app.use(express.json())

//Router middleware
app.use("/api", authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});
