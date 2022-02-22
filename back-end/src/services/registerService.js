const { cryptHashMd5, errorConstructor } = require('../utils/functions');
const { user } = require('../database/models');
const { userAlreadyRegistered } = require('../utils/dictionaries/messagesDefault');
const { conflict } = require('../utils/dictionaries/statusCode');

const verifyUserExists = async (userRequest) => {
  const { name, email } = userRequest;
  const foundUserByName = await user.findOne({
    where: { email },
  });
  const foundUserByEmail = await user.findOne({
    where: { name },
  });
  if (foundUserByEmail || foundUserByName) {
    throw errorConstructor(conflict, userAlreadyRegistered);
  }
};

const registerUserService = async (bodyRequest) => {
  await verifyUserExists(bodyRequest);
  const { name, email, password } = bodyRequest;
  const passwordEncrypted = cryptHashMd5(password);
  const userCreate = {
    name,
    email,
    password: passwordEncrypted,
    role: 'customer',
  };
  await user.create({ ...userCreate });
  return {
    name,
    email,
    role: 'customer',
  };
};

module.exports = {
  registerUserService,
};
