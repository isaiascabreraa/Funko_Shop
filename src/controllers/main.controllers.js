const home = async (req, res) => {
  const { getAllCharacters } = require('../models/characters.model')
  const data = await getAllCharacters()

  if (!data || data.length === 0) {
    return res.status(404).send('Productos no encontrados')
  }

  const target = ['Baby Yoda Blue Ball', 'Charmander', 'Harry Potter']
  const featuredCharacters = data.filter(char => target.includes(char.name))

  const carouselProducts = data.filter(char => !target.includes(char.name)).slice(0, 8)

  res.render('home.ejs', { featuredCharacters, carouselProducts })
}

module.exports = {
  home
}
