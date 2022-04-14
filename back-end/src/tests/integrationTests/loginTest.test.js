const app = require('../../../index.js')
const chai = require('chai');
const { expect } = chai;
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { randomString, createUser, loginRequest } = require('../functions');
const { cryptHashMd5 } = require('../../utils/functions');

chai.use(chaiHttp);

describe('Testa a rota /login', () => {

  describe('Testa um login com sucesso', () => {
    it('Retorna um token ao logar um usuário existente', async () => {
      const name = randomString();
      await createUser(name, '123456')
      const response = await loginRequest(name);
      expect(response).to.have.status(200)
      expect(response.body).to.have.property('token');
    });
  });

  describe('Testa casos de erro', () => {
    it('Dá erro ao tentar logar um usuário que não existe', async () => {
      const response = await loginRequest(randomString())
      expect(response).to.have.status(404);
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.be.equals('Incorrect username or password')
    });
    it('Dá erro ao tentar logar um usuário com a senha errada', async () => {
      const name = randomString();
      await createUser(name, '123456');
      const response = await loginRequest(name, '654321');
      expect(response).to.have.status(404);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equals('Incorrect username or password');
    })
    it('Dá erro ao logar um usuário sem a senha', async () => {
      const name = randomString();
      await createUser(name, '123456');
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: `${name}@gmail.com`
        });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equals('"password" is required');
    })
  });
});