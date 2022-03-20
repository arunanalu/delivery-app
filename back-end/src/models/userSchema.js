const { default: mongoose } = require('mongoose');
const connection = require('./mongooseConnection');

const userSchema = new mongoose.Schema({
  name: 'String',
  email: 'String',
  password: 'String',
  role: 'String',
});

const User = connection.model('User', userSchema);

module.exports = User;