
const { get_characters } = require("../models/characters.model");

const getCharactersApi = async (req, res) => {
    try {
      const data = await get_characters();
      return res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener personajes' });
    }
  };
  
  module.exports = { getCharactersApi };