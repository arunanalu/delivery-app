const { default: mongoose } = require('mongoose');
const connection = require('./mongooseConnection');

const { Schema } = mongoose;

const salesProductSchema = new mongoose.Schema({
  saleId: {
    type: Schema.Types.ObjectId,
    ref: 'Sale',
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: 'Number',
});

const SalesProduct = connection.model('SalesProduct', salesProductSchema);

module.exports = SalesProduct;