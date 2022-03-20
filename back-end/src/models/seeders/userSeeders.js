const User = require('../userSchema');

const users = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'c33367701511b4f6020ec61ded352059',
    role: 'administrator',
  },
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: 'e10adc3949ba59abbe56e057f20f883e',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: 'e10adc3949ba59abbe56e057f20f883e',
    role: 'customer',
  },
];

const usersSeeders = async () => {
  try {
    await User.insertMany(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = usersSeeders;