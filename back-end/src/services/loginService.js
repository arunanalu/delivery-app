const { user } = require('../database/models');
const { cryptHashMd5, errorConstructor } = require('../utils/functions');
const { notFound } = require('../utils/dictionaries/statusCode');
const { incorrectData } = require('../utils/dictionaries/messagesDefault');
const { generateToken } = require('../auth/authService');

const loginService = async (requestUser) => {
  const { email: emailRequest, password: passwordRequest } = requestUser;
  const foundUser = await user.findOne({
    where: { email: emailRequest },
  });
  const encryptedPassword = cryptHashMd5(passwordRequest);
  if (!foundUser || encryptedPassword !== foundUser.dataValues.password) {
    throw errorConstructor(notFound, incorrectData);
  }
  const { dataValues: { password, email, id, ...dataWithoutPasswordAndEmail } } = foundUser;
  const token = generateToken(dataWithoutPasswordAndEmail);
  return { token };
};

module.exports = loginService;
