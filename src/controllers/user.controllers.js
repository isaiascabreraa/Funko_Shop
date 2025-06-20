const account = async (req, res) => {
  const { getAccountData } = require('../models/account.model')
  const result = await getAccountData(req.session.userId)

  if (result.status !== 'OK') {
    return res.redirect('/auth/login')
  }
  res.render('./pages/account.ejs', { user: result.userData })
}

const products = async (req, res) => {
  const { getCharactersByUser } = require('../models/characters.model')
  const data = await getCharactersByUser(req.session.userId)
  res.render('./pages/products.ejs', { products: data })
}

const addProducts = async (req, res) => {
  res.render('./pages/add.ejs')
}

const addProductsSubmit = async (req, res) => {
  const { addCharacter } = require('../models/characters.model')
  const data = req.body
  const file = req.files
  const userId = req.session.userId

  // Hago los chequeos necesarios.
  // Si todo está ok entonces...

  try {
    await addCharacter(data, file, userId)
    return res.redirect('/shop')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Error al agregar el producto')
  }
}

module.exports = {
  account,
  products,
  addProducts,
  addProductsSubmit
}
