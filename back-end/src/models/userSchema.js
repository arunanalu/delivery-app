/* eslint-disable no-underscore-dangle */
const { default: mongoose } = require('mongoose');
const connection = require('./mongooseConnection');

const userSchema = new mongoose.Schema({
  name: 'String',
  email: 'String',
  password: 'String',
  role: 'String',
});

userSchema.virtual('id').get(function transform() {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

const User = connection.model('User', userSchema);

module.exports = User;