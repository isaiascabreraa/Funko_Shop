const request = require('supertest')
const { app, server } = require('../../app')
const { conn } = require('../../src/config/connections')
const api = request(app)

describe('GET /', () => {
  test('Debería responder con status 200 y renderizar la vista', async () => {
    await api.get('/').expect(200)
  })
})

afterAll(async () => {
  await conn.end()
  server.close()
})
