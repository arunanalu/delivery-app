/* eslint-disable no-underscore-dangle */
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

productSchema.virtual('id').get(function transform() {
  return this._id.toHexString();
});

productSchema.set('toJSON', {
  virtuals: true,
});

const Product = connection.model('Product', productSchema);

module.exports = Product;