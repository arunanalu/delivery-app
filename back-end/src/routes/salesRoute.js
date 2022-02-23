const express = require('express');
const { registerSalesController, 
  updateSaleStatusController } = require('../controllers/saleController');

const salesRoute = express.Router();

salesRoute.post('/', registerSalesController);
salesRoute.put('/:id', updateSaleStatusController);

module.exports = salesRoute;
