/* eslint-disable no-underscore-dangle */
const { default: mongoose } = require('mongoose');
const connection = require('./mongooseConnection');

const { Schema } = mongoose;

const saleScheema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  totalPrice: 'Number',
  deliveryAddress: 'String',
  deliveryNumber: 'String',
  saleDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: 'String',
    default: 'Pendente',
  },
});

saleScheema.virtual('id').get(function transform() {
  return this._id.toHexString();
});

saleScheema.set('toJSON', {
  virtuals: true,
});

const Sale = connection.model('Sale', saleScheema);

module.exports = Sale;