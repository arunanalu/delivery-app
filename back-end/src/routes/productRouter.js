const express = require('express');
const getAllProductsController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const productRouter = express.Router();

productRouter.get('/', authMiddleware, getAllProductsController);

module.exports = productRouter;
