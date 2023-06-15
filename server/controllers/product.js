import slugify from "slugify";
import Product from "../models/product.js";
import fs from 'fs'

export const create = async (req, res) => {
    // console.log('rayyyy req:',req.fields)
  try {
    const { name, description, price, category, quantity, shipping } =
    req.fields;
  const { photo } = req.files;
    //Validation :
      // validation
      switch (true) {
        case !name.trim():
          return res.json({ error: "Name is required" });
        case !description.trim():
          return res.json({ error: "Description is required" });
        case !price.trim():
          return res.json({ error: "Price is required" });
        case !category.trim():
          return res.json({ error: "Category is required" });
        case !quantity.trim():
          return res.json({ error: "Quantity is required" });
        case !shipping.trim():
          return res.json({ error: "Shipping is required" });
        case photo && photo.size > 1000000:
          return res.json({ error: "Image should be less than 1mb in size" });
      }
      //Create product 
      const product=new Product({...req.fields,slug:slugify(name)})
      if (photo) {
        product.photo.data=fs.readFileSync(photo.path) 
        product.photo.contentType=photo.type
      }
      await product.save();
      res.json(product)

  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
