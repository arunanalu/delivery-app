const { registerUserService } = require('../services/registerService');
const { created } = require('../utils/dictionaries/statusCode');

const registerUserController = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    return res.status(created).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUserController };
