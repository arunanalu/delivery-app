const { registerSalesService, updateSaleStatusService } = require('../services/saleService');
const { successUpdate } = require('../utils/dictionaries/messagesDefault');
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

const updateSaleStatusController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await updateSaleStatusService(id, status);
    res.status(success).json(successUpdate);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerSalesController, updateSaleStatusController };