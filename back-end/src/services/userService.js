const { cryptHashMd5, errorConstructor } = require('../utils/functions');
const { userAlreadyRegistered, 
  invalidId } = require('../utils/dictionaries/messagesDefault');
const { conflict, badRequest } = require('../utils/dictionaries/statusCode');
const { userValidation, 
  registerUserWithRoleValidation, 
  adminValidation } = require('../validations/registerUserValidations');
const { generateToken } = require('../auth/authService');
const User = require('../models/userSchema');

const registerUserService = async (bodyRequest) => {
  const { name, email, password } = bodyRequest;
  userValidation(name, email, password);
  const passwordEncrypted = cryptHashMd5(password);
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) throw errorConstructor(conflict, userAlreadyRegistered);
  const { id, role } = await User.create({
    name, email, password: passwordEncrypted, role: 'customer' });
  const token = generateToken({ id, name, role });
  return {
    id,
    name,
    role,
    token,
  };
};

const registerUserWithRoleService = async (bodyRequest, loggedUser) => {
  registerUserWithRoleValidation(bodyRequest, loggedUser.role);
  const { name, email, password, role } = bodyRequest;
  userValidation(name, email, password);
  const passwordEncrypted = cryptHashMd5(password);
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) throw errorConstructor(conflict, userAlreadyRegistered);
  const { id } = await User.create({
    name, email, password: passwordEncrypted, role });
  const token = generateToken({ id, name, role });
  return {
    id,
    name,
    role,
    token,
  };
};

const getAllUsersService = async () => {
  const users = await User.find();
  return users;
};

const verifyUserId = async (id) => {
  const shouldExist = await User.findOne({ _id: id });
  if (!shouldExist) throw errorConstructor(badRequest, invalidId);
};

const deleteUserService = async (id, loggedUser) => {
  await verifyUserId(id);
  await adminValidation(loggedUser.role);
  await User.deleteOne({ _id: id });
};

module.exports = {
  registerUserService,
  registerUserWithRoleService,
  getAllUsersService,
  deleteUserService,
};
