import slugify from "slugify";
import Category from "../models/category.js";
import Product from "../models/product.js";

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
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    //Verify Existing Category
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({
        error: "Existing Category ! Please Try an other name",
      });
    }

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name, slug: slugify(name) },
      { new: true } //To return the updated data
    );
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    res.json(removed);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Category.find();
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const productsByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    const products = await Product.find({ category }).populate("category");
    res.json({ category, products });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
