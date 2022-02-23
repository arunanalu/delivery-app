const express = require('express');
const { registerSalesController, 
  updateSaleStatusController, 
  getSalesByUserIdController } = require('../controllers/saleController');

const salesRoute = express.Router();

salesRoute.get('/:userId', getSalesByUserIdController);
salesRoute.post('/', registerSalesController);
salesRoute.put('/:id', updateSaleStatusController);

module.exports = salesRoute;
