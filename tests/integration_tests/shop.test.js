

const request = require('supertest');
const app = require('../../app');

const api = request(app)

describe('GET /shop', () => {
  
  test('Debería responder con status 200 y renderizar la vista', async () => {
    await api.get('/shop').expect(200)
  });

});
