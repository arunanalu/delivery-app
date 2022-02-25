const Joi = require('@hapi/joi');
const { unauthorizedUser } = require('../utils/dictionaries/messagesDefault');
const { badRequest, unauthorized } = require('../utils/dictionaries/statusCode');
const { errorConstructor } = require('../utils/functions');

const userSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().max(255).email().required(),
  password: Joi.string().max(255).required(),
});

const userWithRoleSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().max(255).email().required(),
  password: Joi.string().max(255).required(),
  role: Joi.string().required(),
});

const userValidation = (name, email, password) => {
  const { error } = userSchema.validate({ name, email, password });
  if (error) throw errorConstructor(badRequest, error.message);
};

const adminValidation = (role) => {
  if (role !== 'administrator') throw errorConstructor(unauthorized, unauthorizedUser);
};
 
const registerUserWithRoleValidation = (userWithRole, role) => {
  const { error } = userWithRoleSchema.validate({ ...userWithRole });
  if (error) throw errorConstructor(badRequest, error.message);
  adminValidation(role);
};

module.exports = { userValidation, registerUserWithRoleValidation, adminValidation };