const shell = require('shelljs');
require('dotenv').config()

const environment = process.env.NODE_ENV || 'TEST';

if (environment === 'TEST') {
  before(async () => {
    shell.exec(`cross-env NODE_ENV=${environment} node ./src/models/seeders/resetDb.js`);
  });
}