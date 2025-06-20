const jest = require('jest-mock')

module.exports = {
  get_character_by_id: jest.fn(),
  get_brand_characters: jest.fn(),
  get_characters: jest.fn(),
  count_characters: jest.fn(),
  get_all_characters: jest.fn(),
  get_characters_by_user: jest.fn(),
  add_character: jest.fn()
}
