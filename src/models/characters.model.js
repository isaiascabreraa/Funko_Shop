
const { conn } = require('../config/connections');

const get_characters = async () => {
    const [rows, fields] = await conn.query('SELECT * FROM products;');
    return rows;
}

const get_character = async (id) => {
    const [rows] = await conn.query(`SELECT * FROM products WHERE id = ${id};`);
    return rows;
}

const get_featured_characters = async () => {
    const [rows, fields] = await conn.query('SELECT * FROM products ORDER BY id ASC LIMIT 6;');
    return rows;
}

module.exports = {
    get_character,
    get_characters,
    get_featured_characters,
}