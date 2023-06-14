import { hashPassword } from "../helpers/auth.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email }); //email:email
    if (existingUser) {
      return res.json({ error: "Email is taken" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
