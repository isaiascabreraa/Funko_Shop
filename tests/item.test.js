jest.mock('../src/models/characters.model')

const charactersModel = require('../src/models/characters.model')
const request = require('supertest')
const { app } = require('../app')

describe('GET /shop/item/:id', () => {
  it('debería renderizar la vista con los datos correctos', async () => {
    const fakeCharacter = { id: 1, name: 'Charmander', brand_name: 'Pokemon' }
    const fakeRelated = []

    charactersModel.get_character_by_id.mockResolvedValue([fakeCharacter])
    charactersModel.get_brand_characters.mockResolvedValue([fakeCharacter, ...fakeRelated])

    const res = await request(app).get('/shop/item/1') 

    expect(res.status).toBe(200)
    expect(res.text).toContain('Charmander')
    expect(res.text).toContain('Pokemon')

  })

  it('debería renderizar los personajes relacionados correctamente', async () => {
    const fakeCharacter = { id: 1, name: 'Charmander', brand_name: 'Pokemon' }
    const fakeRelated = [
      { id: 2, name: 'Pikachu', brand_name: 'Pokemon' },
      { id: 3, name: 'Squirtle', brand_name: 'Pokemon' }
    ]

    charactersModel.get_character_by_id.mockResolvedValue([fakeCharacter])
    charactersModel.get_brand_characters.mockResolvedValue([fakeCharacter, ...fakeRelated])

    const res = await request(app).get('/shop/item/1')

    expect(res.status).toBe(200)
    expect(res.text).toContain('Pikachu')
    expect(res.text).toContain('Squirtle')
    expect(fakeRelated).toHaveLength(2)
    fakeRelated.forEach(character => {
      expect(character.brand_name).toBe('Pokemon')
    })
  })

  it('debería devolver 404 si no se encuentra el personaje', async () => {
    charactersModel.get_character_by_id.mockResolvedValue([])

    const res = await request(app).get('/shop/item/999')

    expect(res.status).toBe(404)
    expect(res.text).toContain('Producto no encontrado')
  })
})
