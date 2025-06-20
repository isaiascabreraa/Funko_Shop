const bcrypt = require('bcrypt')
const { conn } = require('../config/connections')

const checkEmail = async (email) => {
  try {
    const validatedUser = await conn.query('SELECT * FROM users WHERE email = $1;', [email])
    if (validatedUser.rows.length === 0) {
      return { status: 'NOT_FOUND' }
    }
    const currentUser = validatedUser.rows[0]
    return { status: 'OK', currentUser }
  } catch (error) {
    console.error('Error en chequeo de correo electrónico:', error)
    throw error
  }
}

const checkPassword = async (password, passwordHash) => {
  try {
    const validatedPassword = await bcrypt.compare(password, passwordHash)
    if (!validatedPassword) {
      return { status: 'INVALID_PASSWORD' }
    }
    return { status: 'OK' }
  } catch (error) {
    console.error('Error en chequeo de contraseña:', error)
    throw error
  }
}

const authenticateUser = async (email, password) => {
  try {
    const user = await checkEmail(email)
    if (user.status !== 'OK') {
      return { status: 'NOT_FOUND' }
    }

    const passwordAuthenticated = await checkPassword(password, user.currentUser.password_hash)
    if (passwordAuthenticated.status !== 'OK') {
      return { status: 'INVALID_PASSWORD' }
    }

    return { status: 'OK', user: user.currentUser }
  } catch (error) {
    console.error('Error en autenticación:', error)
    throw error
  }
}

const registerUser = async (data) => {
  try {
    const userAlreadyExist = await checkEmail(data.email)
    if (userAlreadyExist.status === 'OK') {
      return { status: 'USER_ALREADY_EXISTS' }
    }

    const hashedPassword = await bcrypt.hash(data.password, 12)

    const result = await conn.query(
      `
      INSERT INTO users (first_name, last_name, age, email, password_hash)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
      `,
      [data.firstname, data.lastname, data.age, data.email, hashedPassword]
    )

    return { status: 'OK', userId: result.rows[0].id }
  } catch (error) {
    console.error('Error en register:', error)
    return { status: 'ERROR', error }
  }
}

module.exports = {
  authenticateUser,
  registerUser
}
