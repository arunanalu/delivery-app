const { cryptHashMd5, errorConstructor } = require('../utils/functions');
const { user } = require('../database/models');
const { userAlreadyRegistered, 
  invalidId } = require('../utils/dictionaries/messagesDefault');
const { conflict, badRequest } = require('../utils/dictionaries/statusCode');
const { userValidation, 
  registerUserWithRoleValidation, 
  adminValidation } = require('../validations/registerUserValidations');
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
  const token = generateToken({ id, name, role: 'customer' });
  return {
    id: userRegister.id,
    name: userRegister.name,
    role: 'customer',
    token,
  };
};

const registerUserWithRoleService = async (bodyRequest, loggedUser) => {
  registerUserWithRoleValidation(bodyRequest, loggedUser.role);
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

const verifyUserId = async (id) => {
  const shouldExist = await user.findAll({ where: { id } });
  if (!shouldExist) throw errorConstructor(badRequest, invalidId);
};

const deleteUserService = async (id, loggedUser) => {
  await verifyUserId(id);
  // console.log(loggedUser);
  await adminValidation(loggedUser.role);
  await user.destroy({ where: { id } });
};

module.exports = {
  registerUserService,
  registerUserWithRoleService,
  getAllUsersService,
  deleteUserService,
};
