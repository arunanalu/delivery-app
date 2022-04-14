const app = require('../../api/app')
const chai = require('chai');
const { expect } = chai;
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { createUser, randomString, loginRequest, getProductsRequest } = require('../functions');

chai.use(chaiHttp);

describe('Testa a rota /product', () => {

  describe('Testa se é possível obter todos os produtos', () => {
    it('Retorna a lista de produtos com sucesso', async () => {
      const name = randomString()
      await createUser(name);
      const response = await loginRequest(name);
      expect(response.body).to.have.property('token')
      const products = await getProductsRequest(response.body.token);
      expect(products).to.have.status(200);
    });
  });

  describe('Testa casos de erro', () => {
    it('Testa que não é possível obter os produtos com token inválido', async () => {
      const response = await getProductsRequest('123');
      expect(response).to.have.status(401);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equals('Expired or invalid token');
    });
  });
});