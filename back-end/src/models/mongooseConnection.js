const databaseName = 'deliveryApp';

// eslint-disable-next-line max-len
const connectionString = `mongodb+srv://deliveryapp:rxzbsaiFlgSyjE79@cluster0.ufu9e.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const mongoose = require('mongoose');

const connection = mongoose.createConnection(connectionString);

module.exports = connection;