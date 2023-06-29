import slugify from "slugify";
import Product from "../models/product.js";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";
import Order from "../models/order.js";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//CREAT A PRODUCT:
export const create = async (req, res) => {
  //req.fields & req.files ==>Thanks to package : express-formidable
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //Validation :
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
    const product = new Product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

//GET PRODUCTS:
export const list = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category") //To show all category data (not only Id)
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

//GET A PRODUCT:
export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

//GET  PRODUCT PHOTO:
export const photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    if (product.photo.data) {
      /* res.set:==> Useful when returning binary data such as images, as it ensures 
      that the client knows how to interpret and display the received data correctly. */
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

//DELETE A PRODUCT:
export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.productId
    ).select("-photo");
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

//UPDATE A PRODUCT:
export const update = async (req, res) => {
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

    //Updated Product
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

//Filtered Products
export const filteredProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    //$gte : greater than or equal to   //$lte : less than or equal to
    //{ $gte: radio[0], $lte: radios[1] } : remember: array: [60, 79] exp radio[0]:60 & radios[1]:79
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };
    console.log("args=>", args);
    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

//Products Count
export const productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (error) {
    console.log(error);
  }
};

//List Products
export const listProducts = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

//Product Search By Keyword
export const productsSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    // 'i':  is provided to make the matching case-insensitive
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

//Related Products
export const relatedProducts = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    const related = await Product.find({
      category: categoryId,
      _id: { $ne: productId }, // $ne : not equal
    })
      .select("-photo")
      .populate("category")
      .limit(3);
    res.json(related);
  } catch (error) {
    console.log(error);
  }
};

//Get BrainTree Token
export const getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response); //actual token
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//Process Payment
export const processPayment = async (req, res) => {
  try {
    let { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          // res.send(result);
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          //decrement Quantity
          decrementQuantity(cart);
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const decrementQuantity = async (cart) => {
  try {
    const bulkOps = cart.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { quantity: -0, sold: +1 } },
        },
      };
    });
    const updated=await Product.bulkWrite(bulkOps,{})
    console.log( 'updated blk=>',updated)
  } catch (error) {
    console.log(error);
  }
};
