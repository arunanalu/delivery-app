const express = require('express');
const loginController = require('../controllers/loginController');

const loginRoute = express.Router();

loginRoute.post('/', loginController);

module.exports = loginRoute;
