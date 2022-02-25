const express = require('express');
const { registerUserController, 
  registerUserWithRoleController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.post('/register', registerUserController);
userRouter.post('/register/admin', authMiddleware, registerUserWithRoleController);

module.exports = userRouter;
