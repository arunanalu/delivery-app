const express = require('express');
const { registerUserController, 
  registerUserWithRoleController, 
  getAllUsersController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.get('/users', getAllUsersController);
userRouter.post('/register', registerUserController);
userRouter.post('/register/admin', authMiddleware, registerUserWithRoleController);

module.exports = userRouter;
