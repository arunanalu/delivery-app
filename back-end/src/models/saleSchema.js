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
  totalPrice: 'String',
  deliveryAddress: 'String',
  deliveryNumber: 'String',
  saleDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: 'String',
    default: 'pendente',
  },
});

const Sale = connection.model('Sale', saleScheema);

module.exports = Sale;