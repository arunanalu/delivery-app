const shell = require('shelljs');
require('dotenv').config()

const environment = process.env.NODE_ENV || "test";

if (environment === 'test') {
  before(async () => {
    shell.exec(`cross-env NODE_ENV=${environment} npx sequelize-cli db:drop`);
    shell.exec(`cross-env NODE_ENV=${environment} npx sequelize-cli db:create`);
    shell.exec(`cross-env NODE_ENV=${environment} npx sequelize-cli db:migrate`);
    shell.exec(`cross-env NODE_ENV=${environment} npx sequelize-cli db:seed:all $`)
  });
}