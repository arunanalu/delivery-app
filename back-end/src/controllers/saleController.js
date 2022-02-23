const { registerSalesService } = require('../services/saleService');
const { created } = require('../utils/dictionaries/statusCode');

const registerSalesController = async (req, res, next) => {
  try {
    const { sale, products } = req.body;
    const result = await registerSalesService(sale, products);
    res.status(created).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerSalesController };