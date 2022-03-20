// const { user } = require('../database/models');
const { cryptHashMd5, errorConstructor } = require('../utils/functions');
const { notFound } = require('../utils/dictionaries/statusCode');
const { incorrectData } = require('../utils/dictionaries/messagesDefault');
const { generateToken } = require('../auth/authService');
const { loginValidation } = require('../validations/loginValidations');
const User = require('../models/userSchema');

const loginService = async (requestUser) => {
  loginValidation(requestUser);
  const { email: emailRequest, password: passwordRequest } = requestUser;
  // const foundUser = await user.findOne({
  //   where: { email: emailRequest },
  // });
  const foundUser = await User.findOne({ email: emailRequest });
  const encryptedPassword = cryptHashMd5(passwordRequest);
  if (!foundUser || encryptedPassword !== foundUser.password) {
    throw errorConstructor(notFound, incorrectData);
  }
  const { name, email, role, id } = foundUser;
  const token = generateToken({ name, email, role, id });
  return { token, name, email, role, id };
};

module.exports = loginService;
