const jwt = require('jsonwebtoken');
const fs = require('fs');
const API_SECRET = fs.readFileSync('./jwt.evaluation.key', { encoding: "utf-8" }).trim();

const JWT_CONFIG = {
  expiresIn: 3600,
  algorithm: 'HS256',
};

const generateToken = (user) => jwt.sign({ ...user }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    return decoded;
  } catch (error) {
    console.log('FALHA NA VERIFICAÇÃO');
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
