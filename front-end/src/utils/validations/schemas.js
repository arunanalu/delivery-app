import Joi from 'joi';

const minPasswordLength = 6;
const minUserLength = 12;

export const validEmail = Joi.string()
  .regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/).required();

export const validPassword = Joi.string().min(minPasswordLength).required();

export const validName = Joi.string().min(minUserLength);

export const validRegisterForm = Joi.object({
  email: validEmail,
  password: validPassword,
  name: validName,
});

export const validLoginForm = Joi.object({
  email: validEmail,
  password: validPassword,
});
