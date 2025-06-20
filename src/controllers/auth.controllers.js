const login = async (req, res) => {
  res.render('./pages/login.ejs', { error: null })
}

const loginSubmit = async (req, res) => {
  try {
    const { authenticateUser } = require('../models/authentication.model')

    const { email, password } = req.body
    if (!email || !password) {
      return res.render('./pages/register.ejs', { error: 'Todos los campos son obligatorios' })
    }

    const result = await authenticateUser(email, password)

    if (result.status === 'OK') {
      res.locals.isLogged = true
      req.session.isLogged = true
      req.session.userId = result.user.id
      return res.redirect('/')
    }

    req.session.isLogged = false
    res.locals.isLogged = false

    return res.render('./pages/login.ejs', { error: 'Email y/o contraseña incorrectos. Intente nuevamente' })
  } catch (error) {
    console.error('Error en loginSubmit:', error)
    return res.render('./pages/login.ejs', { error: 'Error inesperado, intente nuevamente.' })
  }
}

const register = (req, res) => {
  res.render('./pages/register.ejs')
}

const registerSubmit = async (req, res) => {
  try {
    const { registerUser } = require('../models/authentication.model')

    const data = req.body
    if (!data.email || !data.password) {
      return res.render('./pages/register.ejs', { error: 'Todos los campos son obligatorios' })
    }

    const result = await registerUser(data)
    if (result.status === 'USER_ALREADY_EXISTS') {
      return res.render('./pages/register.ejs', { error: 'Ya existe un usuario con ese email.' })
    }

    if (result.status === 'ERROR') {
      return res.render('./pages/register.ejs', { error: 'Ocurrió un error al registrar.' })
    }

    req.session.isLogged = true
    req.session.userId = result.userId
    res.locals.isLogged = true
    return res.redirect('/')
  } catch (error) {
    console.error('Error en registerSubmit:', error)
    return res.render('./pages/register.ejs', { error: 'Error inesperado, intente nuevamente.' })
  }
}

const logout = (req, res) => {
  req.session = null
  res.render('./pages/login.ejs', { error: null })
}

module.exports = {
  login,
  loginSubmit,
  register,
  registerSubmit,
  logout
}
