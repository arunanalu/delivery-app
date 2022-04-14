const { user } = require('../database/models');
const { cryptHashMd5 } = require('../utils/functions');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../api/app')


const randomString = () => {
  const length = 8;
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; i -= 1) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

const createUser = async (name, password = '123456') => {
  const passwordEncrypted = cryptHashMd5(password)
  await user.create({ name: name, email: `${name}@gmail.com`, password: passwordEncrypted, role: 'customer'});
};

const loginRequest = async (string, password = '123456') => {
  const response = await chai.request(app)
    .post('/login')
    .send({
      email: `${string}@gmail.com`,
      password: password,
    });
  return response;
}

const registerRequest = async (string) => {
  const response = await chai.request(app)
    .post('/register')
    .send({
      name: string,
      email: `${string}@gmail.com`,
      password: '123456'
    });
  return response;
}

const getProductsRequest = async (token) => {
  const response = await chai.request(app)
    .get('/product')
    .set({
      authorization: token,
    });
  return response;
};

module.exports = { randomString, createUser, loginRequest, registerRequest, getProductsRequest }