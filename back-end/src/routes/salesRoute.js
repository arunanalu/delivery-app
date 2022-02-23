const express = require('express');
const { registerSalesController, getSaleDetailsController } = require('../controllers/saleController');

const salesRoute = express.Router();

salesRoute.post('/', registerSalesController);
salesRoute.get('/details', getSaleDetailsController);

module.exports = salesRoute;
