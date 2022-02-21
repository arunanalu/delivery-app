const { verifyToken } = require("../services/authService");
const {
  jwtMalformed,
  missingAuth,
} = require("../utils/dictionary/messagesDefault");
const { unauthorized } = require("../utils/dictionary/statusCode");
const { errorConstructor } = require('../utils/functions');

module.exports = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      throw errorConstructor(unauthorized, missingAuth);

    const user = verifyToken(authorization);

    if (!user) throw errorConstructor(unauthorized, jwtMalformed);
    req.user = user;
    next();
  } catch (error) {
    console.log("FALHA AUTH");
    next(error);
  }
};
