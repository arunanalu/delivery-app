const Joi = require('@hapi/joi');
const { badRequest } = require('../utils/dictionaries/statusCode');
const { errorConstructor } = require('../utils/functions');

const userSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().max(255).email().required(),
  password: Joi.string().max(255).required(),
});

const userValidation = (name, email, password) => {
  const { error } = userSchema.validate({ name, email, password });
  if (error) throw errorConstructor(badRequest, error.message);
};

module.exports = { userValidation };