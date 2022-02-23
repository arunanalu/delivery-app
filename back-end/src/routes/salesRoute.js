const express = require('express');
const { registerSalesController } = require('../controllers/saleController');

const salesRoute = express.Router();

salesRoute.post('/', registerSalesController);

module.exports = salesRoute;
