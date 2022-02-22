const { cryptHashMd5, errorConstructor } = require('../utils/functions');
const { user } = require('../database/models');
const { userAlreadyRegistered } = require('../utils/dictionaries/messagesDefault');
const { conflict } = require('../utils/dictionaries/statusCode');

const registerUserService = async (bodyRequest) => {
  const { name, email, password } = bodyRequest;
  const passwordEncrypted = cryptHashMd5(password);
  const [userRegister, created] = await user.findOrCreate({
    where: { email, name },
    defaults: { name, email, password: passwordEncrypted, role: 'customer' },
  });
  if (!created) throw errorConstructor(conflict, userAlreadyRegistered);
  return {
    id: userRegister.id,
    name: userRegister.name,
    role: 'customer',
  };
};

module.exports = {
  registerUserService,
};
