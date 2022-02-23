import Joi from 'joi';

const minPasswordLength = 6;
const minUserLength = 6;

export const validEmail = Joi.string()
  .regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/).required();

export const validPassword = Joi.string().min(minPasswordLength).required();

export const validName = Joi.string().min(minUserLength).required();

export const validForm = Joi.object({
  email: validEmail,
  password: validPassword,
  name: validName,
});