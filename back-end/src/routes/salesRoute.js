const express = require('express');
const {
  getSaleDetailsController,
  registerSalesController,
  getSalesByUserIdController,
  updateSaleStatusController,
} = require('../controllers/saleController');

const salesRoute = express.Router();

salesRoute.get('/details/:id', getSaleDetailsController);
salesRoute.get('/:userId', getSalesByUserIdController);
salesRoute.post('/', registerSalesController);
salesRoute.put('/:id', updateSaleStatusController);

module.exports = salesRoute;
