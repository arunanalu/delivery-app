const crypto = require('crypto');

const errorConstructor = (status, message) => ({ status, message }); 

const cryptHashMd5 = (password) =>
  crypto
    .createHash('md5')
    .update(password)
    .digest('hex');

module.exports = { errorConstructor, cryptHashMd5 };
