const { registerUserService, registerUserWithRoleService } = require('../services/userService');
const { created } = require('../utils/dictionaries/statusCode');

const registerUserController = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    return res.status(created).json(user);
  } catch (error) {
    next(error);
  }
};

const registerUserWithRoleController = async (req, res, next) => {
  try {
    const user = await registerUserWithRoleService(req.body, req.user);
    return res.status(created).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUserController, registerUserWithRoleController };
