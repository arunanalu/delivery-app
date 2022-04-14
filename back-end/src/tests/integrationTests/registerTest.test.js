const app = require('../../../index.js')
const chai = require('chai');
const { expect } = chai;
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { randomString, registerRequest } = require('../functions');


chai.use(chaiHttp);

describe('Testa a rota /register', () => {

  describe('Testa um caso de registro com sucesso', () => {
    let response;
    beforeEach(async () => {
      response = await registerRequest(randomString())
    })
    it('Retorna status 201 ao registrar usuário com sucesso', async () => {
      expect(response).to.have.status(201)
      })
    it('Retorna um token ao registrar usuário com sucesso', async () => {
      expect(response.body).to.have.property('token')
    })
  })

  describe('Testa casos de erro', () => {
    it('Dá erro ao tentar registrar o mesmo usuário duas vezes', async () => {
      const string = randomString();
      await registerRequest(string)
      const response = await registerRequest(string)
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.be.equals('User already registered')
    })
    it('Dá erro ao tentar registrar usuário sem o email', async () => {
      const response = await chai.request(app)
      .post('/register')
      .send({
        name: 'ciclano',
        password: '123456'
      })
      expect(response.body).to.have.property('message');
      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equals('"email" is required');
    })
    it('Dá erro ao tentar registrar usuário com email inválido', async () => {
      const string = randomString();
      const response = await chai.request(app)
        .post('/register')
        .send({
          name: string,
          email: `${string}.com`,
          password: '123456'
        });
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equals('"email" must be a valid email');
    });
  })
})