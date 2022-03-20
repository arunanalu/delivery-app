/* eslint-disable camelcase */
const { default: mongoose } = require('mongoose');
const connection = require('./mongooseConnection');

const productSchema = new mongoose.Schema({
  name: 'String',
  price: 'String',
  url_image: {
    type: String,
    alias: 'urlImage',
  },
});

const Product = connection.model('Product', productSchema);

module.exports = Product;