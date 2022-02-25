const { cryptHashMd5, errorConstructor } = require('../utils/functions');
const { user } = require('../database/models');
const { userAlreadyRegistered } = require('../utils/dictionaries/messagesDefault');
const { conflict } = require('../utils/dictionaries/statusCode');
const { userValidation, adminRoleValidation } = require('../validations/registerUserValidations');
const { generateToken } = require('../auth/authService');

const registerUserService = async (bodyRequest) => {
  const { name, email, password } = bodyRequest;
  userValidation(name, email, password);
  const passwordEncrypted = cryptHashMd5(password);
  const [userRegister, created] = await user.findOrCreate({
    where: { email },
    defaults: { name, email, password: passwordEncrypted, role: 'customer' },
  });
  if (!created) throw errorConstructor(conflict, userAlreadyRegistered);
  const { dataValues: { id } } = userRegister;
  const token = generateToken({ id, name });
  return {
    id: userRegister.id,
    name: userRegister.name,
    role: 'customer',
    token,
  };
};

const registerUserWithRoleService = async (bodyRequest, loggedUser) => {
  adminRoleValidation(bodyRequest, loggedUser.role);
  const { name, email, password, role } = bodyRequest;
  userValidation(name, email, password);
  const passwordEncrypted = cryptHashMd5(password);
  const [userRegister, created] = await user.findOrCreate({
    where: { email, name },
    defaults: { name, email, password: passwordEncrypted, role },
  });
  if (!created) throw errorConstructor(conflict, userAlreadyRegistered);
  return {
    id: userRegister.id,
    name: userRegister.name,
    role,
  };
};

  const getAllUsersService = async () => {
    const users = await user.findAll({});
    return users;
  };

module.exports = {
  registerUserService,
  registerUserWithRoleService,
  getAllUsersService,
};
