const shop = async (req, res) => {
  try {
    const { getCharacters, countCharacters } = require('../models/characters.model')

    const { search, sort } = req.query
    const minPrice = req.query.min_price ? Number(req.query.min_price) : null
    const maxPrice = req.query.max_price ? Number(req.query.max_price) : null

    const page = req.query.page ? parseInt(req.query.page) : 1
    const limit = 9
    const offset = (page - 1) * limit

    const [characters, total] = await Promise.all([
      getCharacters({ search, sort, minPrice, maxPrice, limit, offset }),
      countCharacters({ search, minPrice, maxPrice })
    ])

    const totalPages = Math.ceil(total / limit)

    res.render('./pages/shop.ejs', { characters, search, sort, minPrice, maxPrice, page, totalPages })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error en el servidor')
  }
}

const item = async (req, res) => {
  const { getCharacterById, getBrandCharacters } = require('../models/characters.model')

  const data = await getCharacterById(req.params.id)
  if (!data || data.length === 0) {
    return res.status(404).send('Producto no encontrado')
  }
  const dataFeatured = await getBrandCharacters(data[0].brand_name)

  const character = data[0]
  const carouselProducts = dataFeatured.filter(item => item.id !== character.id)

  res.render('./pages/item.ejs', { character, carouselProducts })
}

module.exports = {
  shop,
  item
}
