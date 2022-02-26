const { user } = require('../database/models');
const { cryptHashMd5, errorConstructor } = require('../utils/functions');
const { notFound } = require('../utils/dictionaries/statusCode');
const { incorrectData } = require('../utils/dictionaries/messagesDefault');
const { generateToken } = require('../auth/authService');
const { loginValidation } = require('../validations/loginValidations');

const loginService = async (requestUser) => {
  loginValidation(requestUser);
  const { email: emailRequest, password: passwordRequest } = requestUser;
  const foundUser = await user.findOne({
    where: { email: emailRequest },
  });
  const encryptedPassword = cryptHashMd5(passwordRequest);
  if (!foundUser || encryptedPassword !== foundUser.dataValues.password) {
    throw errorConstructor(notFound, incorrectData);
  }
  const { dataValues: { password, ...dataWithoutPassword } } = foundUser;
  console.log(dataWithoutPassword);
  const token = generateToken(dataWithoutPassword);
  return { token, ...dataWithoutPassword };
};

module.exports = loginService;
