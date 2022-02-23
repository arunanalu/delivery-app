const Joi = require('@hapi/joi');
const { badRequest } = require('../utils/dictionaries/statusCode');
const { errorConstructor } = require('../utils/functions');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userValidation = (name, email, password) => {
  const { error } = userSchema.validate({ name, email, password });
  if (error) throw errorConstructor(badRequest, error.message);
};

module.exports = { userValidation };