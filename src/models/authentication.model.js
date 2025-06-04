
const bcrypt = require('bcrypt');
const { conn } = require('../config/connections');

const authenticate_user = async (email, password) => {

    try {
        const result = await conn.query(`SELECT * FROM users WHERE email = $1;`,[email]);
        if (result.rows.length === 0) {
            return { status: 'NOT_FOUND' };
        }
        const current_user = result.rows[0];

        const validPassword = await bcrypt.compare(password, current_user.password_hash);
        if (!validPassword) {
            return { status: 'INVALID_PASSWORD' };
        }

        return { status: 'OK', current_user };

    } catch (error) {
        console.error('Error en autenticación:', error);
        throw error;
    }
}

const register_user = async (data) => {

    try {
        const existingUser = await authenticate_user(data.email, data.password);
        if (existingUser.status === 'OK') {
            return { status: 'USER_ALREADY_EXISTS' };
        }

        const hashedPassword = await bcrypt.hash(data.password, 12)

        const result = await conn.query(`
            INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)
            RETURNING id`, [data.firstname, data.lastname, data.email, hashedPassword]);

        return { status: 'OK', id: result.rows[0].id };

    } catch (error) {
        console.error('Error en register:', error);
        return { status: 'ERROR', error };
  }
}

module.exports = {
    authenticate_user,
    register_user
}