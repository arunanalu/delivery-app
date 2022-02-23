const { registerSalesService } = require('../services/saleService');
const { created, success } = require('../utils/dictionaries/statusCode');

const registerSalesController = async (req, res, next) => {
  try {
    const { sale, products } = req.body;
    const result = await registerSalesService(sale, products);
    res.status(created).json(result);
  } catch (error) {
    next(error);
  }
};

const getSaleDetailsController = async (req, res, next) => {
  try {
    const { id } = req.param;
    const sale = await getSaleDetailsService(id);
    return res.status(success).json(sale);
  } catch (error) {
    next(error);
  }
}

module.exports = { registerSalesController, getSaleDetailsController };
