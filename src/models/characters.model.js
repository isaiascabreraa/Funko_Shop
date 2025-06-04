
const { conn } = require('../config/connections');


const get_character = async (id) => {
    const result = await conn.query(`
        SELECT p.id, p.name, p.price, p.payments, p.description, p.stock, c.primary_image, b.name AS brand_name
        FROM products p
        LEFT JOIN content c ON p.id = c.product_id
        LEFT JOIN brands b ON p.brand_id = b.id
        WHERE p.id = $1;
    `, [id]);
    return result.rows;
}

const get_characters = async () => {
    const result = await conn.query(`
        SELECT p.id, p.name, p.price, p.payments, p.description, p.stock, c.primary_image, b.name AS brand_name
        FROM products p
        LEFT JOIN content c ON p.id = c.product_id
        LEFT JOIN brands b ON p.brand_id = b.id;
    `);
    return result.rows;
}

const get_brand_characters = async (brand) => {
    const result = await conn.query(`
        SELECT p.id, p.name, p.price, p.payments, p.description, p.stock, c.primary_image, b.name AS brand_name
        FROM products p
        LEFT JOIN content c ON p.id = c.product_id
        JOIN brands b ON p.brand_id = b.id
        WHERE b.name = $1;
    `, [brand]);
    return result.rows;
}

module.exports = {
    get_character,
    get_characters,
    get_brand_characters,
};
