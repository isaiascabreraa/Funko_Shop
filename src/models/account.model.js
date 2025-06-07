
const { conn } = require('../config/connections');


const get_account_data = async (user_id) => {

    try {
        const result = await conn.query(`
        SELECT id, first_name, last_name, age, email FROM users WHERE id = $1
        `, [user_id]);

        if (result.rows.length === 0) {
            return { status: 'NOT_FOUND' };
        }

        return { status: 'OK', user_data: result.rows[0] };

    } catch (error) {
        console.error('Error al obtener datos de cuenta:', error);
        throw error;
    }
}


module.exports = {
    get_account_data
}