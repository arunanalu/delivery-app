require('dotenv').config();

const {CONNECT_STRING} = process.env;

const mongoose = require('mongoose');

const connection = mongoose.createConnection(CONNECT_STRING);

module.exports = connection;