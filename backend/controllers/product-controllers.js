import Product from "../models/productModel";

export const retrieveProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.send(products);
};
export const createProduct = async (req, res, next) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
    rating,
    numReviews,
  } = req.body;
  const product = new Product({
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
    rating,
    numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ msg: "New product created", data: newProduct });
  }
  return res.status(500).send({ msg: "Error in creating product" });
};
export const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ msg: "Product Updated", data: updatedProduct });
    }
  }
  return res.status(500).send({ msg: "Error in updating product" });
};
export const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    await product.remove();

    res.status(200).send({ msg: "Product deleted" });
  } else {
    return res.status(500).send({ msg: "Error in deleting product" });
  }
};
export const retrieveProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product not found" });
  }
};
