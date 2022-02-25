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

const adminRoleValidation = (userWithRole, role) => {
  const { error } = userWithRoleSchema.validate({ ...userWithRole });
  if (error) throw errorConstructor(badRequest, error.message);
  if (role !== 'admin') throw errorConstructor(unauthorized, unauthorizedUser);
};

module.exports = { userValidation, adminRoleValidation };