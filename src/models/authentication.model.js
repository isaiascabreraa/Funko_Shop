
const bcrypt = require('bcrypt');
const { conn } = require('../config/connections');

const check_email = async (email) => {
    try {
        const validated_user = await conn.query(`SELECT * FROM users WHERE email = $1;`,[email]);
        if (validated_user.rows.length === 0) {
            return { status: 'NOT_FOUND' };
        }
        const current_user = validated_user.rows[0];
        return { status: 'OK', current_user };

    } catch (error) {
        console.error('Error en chequeo de correo electronico:', error);
        throw error;
    }
}

const check_password = async (password, password_hash) => {
    try {
        const validated_password = await bcrypt.compare(password, password_hash);
        if (!validated_password) {
            return { status: 'INVALID_PASSWORD' };
        }
        return { status: 'OK' };

    } catch (error) {
        console.error('Error en chequeo de contraseña:', error);
        throw error;
    }
}

const authenticate_user = async (email, password) => {
    try {
        const user = await check_email(email);
        if (user.status !== 'OK') {
            return { status: 'NOT_FOUND' };
        }

        const password_authenticated = await check_password(password, user.current_user.password_hash);
        if (password_authenticated.status !== 'OK') {
            return { status: 'INVALID_PASSWORD' };
        }

        return { status: 'OK', user: user.current_user };

    } catch (error) {
        console.error('Error en autenticación:', error);
        throw error;
    }
}

const register_user = async (data) => {
    try {
        const user_alredy_exist = await check_email(data.email);
        if (user_alredy_exist.status === 'OK') {
            return { status: 'USER ALREADY_EXISTS' };
        }

        const hashed_password = await bcrypt.hash(data.password, 12);

        const result = await conn.query(`
            INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `, [data.firstname, data.lastname, data.email, hashed_password]);

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