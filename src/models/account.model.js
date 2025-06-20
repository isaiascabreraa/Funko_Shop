const { conn } = require('../config/connections')

const getAccountData = async (userId) => {
  try {
    const result = await conn.query(
      `
      SELECT id, first_name, last_name, age, email FROM users WHERE id = $1
      `,
      [userId]
    )

    if (result.rows.length === 0) {
      return { status: 'NOT_FOUND' }
    }

    return { status: 'OK', userData: result.rows[0] }
  } catch (error) {
    console.error('Error al obtener datos de cuenta:', error)
    throw error
  }
}

module.exports = {
  getAccountData
}
