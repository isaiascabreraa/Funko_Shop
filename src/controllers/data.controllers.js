const { getAllCharacters } = require('../models/characters.model')

const getDataCharacters = async (req, res) => {
  try {
    const data = await getAllCharacters()
    return res.json(data)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Error al obtener personajes' })
  }
}

module.exports = { getDataCharacters }
