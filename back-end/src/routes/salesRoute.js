const express = require('express');
const {
  getSaleDetailsController,
  registerSalesController,
  getSalesByUserIdController,
  updateSaleStatusController,
} = require('../controllers/saleController');
const authMiddleware = require('../middlewares/authMiddleware');

const salesRoute = express.Router();

salesRoute.get('/details/:id', authMiddleware, getSaleDetailsController);
salesRoute.get('/:userId', authMiddleware, getSalesByUserIdController);
salesRoute.post('/', authMiddleware, registerSalesController);
salesRoute.put('/:id', authMiddleware, updateSaleStatusController);

module.exports = salesRoute;
