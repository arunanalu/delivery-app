const express = require('express');
const { registerUserController } = require('../controllers/registerController');

const registerRouter = express.Router();

registerRouter.post('/', registerUserController);

module.exports = registerRouter;
