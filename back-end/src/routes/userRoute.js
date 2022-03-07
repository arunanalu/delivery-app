const express = require('express');
const { registerUserController, 
  registerUserWithRoleController, 
  getAllUsersController, 
  deleteUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.get('/user', getAllUsersController);
userRouter.post('/register', registerUserController);
userRouter.post('/register/admin', authMiddleware, registerUserWithRoleController);
userRouter.delete('/user/:id', authMiddleware, deleteUserController);

module.exports = userRouter;
