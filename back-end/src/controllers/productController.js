const { product } = require('../database/models');

const getAllProductsController = async (req, res, next) => {
  try {
    const products = await product.findAll({});
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllProductsController;
