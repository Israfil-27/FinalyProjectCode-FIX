import asyncHandle from "../middleware/asyncHandle.js";
import Product from "../models/productsModel.js";

const getProducts = asyncHandle(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? {name :{ $regex : req.query.keyword , $options:"i"}}:{}
  const count = await Product.countDocuments({...keyword});

  const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductsById = asyncHandle(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resourse not fount");
  }
});

const createProduct = asyncHandle(async (req, res) => {
  const product = new Product({
    name: "sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandle(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("resourse not fount");
  }
});

const deleteProduct = asyncHandle(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not fount");
  }
});

const createProductReview = asyncHandle(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product alread reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "review added" });
  } else {
    res.status(404);
    throw new Error("Resource not fount");
  }
});

const getTopProducts = asyncHandle(async (req, res) => {
  const products = await Product.find({}).sort({rating:-1}).limit(3);
  res.status(200).json(products)
});

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts
};
