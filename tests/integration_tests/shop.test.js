/* eslint-env jest */
const request = require('supertest')
const { app, server } = require('../../app')
const { conn } = require('../../src/config/connections')
const api = request(app)

describe('GET /shop', () => {
  test('Debería responder con status 200 y renderizar la vista', async () => {
    await api.get('/shop').expect(200)
  })
})

afterAll(async () => {
  await conn.end()
  server.close()
})
