const Joi = require('@hapi/joi');
const { badRequest } = require('../utils/dictionaries/statusCode');
const { errorConstructor } = require('../utils/functions');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginValidation = (user) => {
  const { error } = loginSchema.validate({ ...user });
  if (error) throw errorConstructor(badRequest, error.message);
};

module.exports = { loginValidation };