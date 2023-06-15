import slugify from "slugify";
import Category from "../models/category.js";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Already exists" });
    }
    const category = await new Category({ name, slug: slugify(name) }).save(); //slugify exp :react js => react-js
    res.json(category)
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const update = async (req, res) => {
    try {
  
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  };

  export const remove = async (req, res) => {
    try {
  
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  };
  
  export const list = async (req, res) => {
    try {
  
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  };