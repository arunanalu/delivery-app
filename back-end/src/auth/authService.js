const jwt = require("jsonwebtoken");
require("dotenv/config");

const API_SECRET = process.env.JWT_SECRET;

const JWT_CONFIG = {
  expiresIn: 3600,
  algorithm: "HS256",
};

const generateToken = (user) => jwt.sign({ user }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    const { user } = decoded;
    return user;
  } catch (error) {
    console.log("FALHA NA VERIFICAÇÃO");
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
