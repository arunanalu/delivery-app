require('dotenv').config();

const { CONNECT_STRING } = process.env;
const { CONNECT_STRING_TEST } = process.env;

const environment = process.env.NODE_ENV;

let connectionString = CONNECT_STRING;

if (environment === 'TEST') {
  connectionString = CONNECT_STRING_TEST;
}

const mongoose = require('mongoose');

const connection = mongoose.createConnection(connectionString);

module.exports = connection;