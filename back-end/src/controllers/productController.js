const Product = require('../models/productSchema');

const getAllProductsController = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllProductsController;
