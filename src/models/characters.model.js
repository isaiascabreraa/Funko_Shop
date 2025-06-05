
const { conn } = require('../config/connections');


const get_character_by_id = async (product_id) => {
    const result = await conn.query(`
        SELECT p.id, p.name, p.price, p.payments, p.description, p.stock, c.primary_image, b.name AS brand_name
        FROM products p
        LEFT JOIN content c ON p.id = c.product_id
        LEFT JOIN brands b ON p.brand_id = b.id
        WHERE p.id = $1;
    `, [product_id]);
    return result.rows;
}

const get_all_characters = async () => {
    const result = await conn.query(`
        SELECT p.id, p.name, p.price, p.payments, p.description, p.stock, c.primary_image, b.name AS brand_name
        FROM products p
        LEFT JOIN content c ON p.id = c.product_id
        LEFT JOIN brands b ON p.brand_id = b.id;
    `);
    return result.rows;
}

const get_characters_by_user = async (user_id) => {
    const result = await conn.query(`
        SELECT p.id, p.name, p.price, p.payments, p.description, p.stock, c.primary_image, b.name AS brand_name
        FROM products p
        LEFT JOIN content c ON p.id = c.product_id
        LEFT JOIN brands b ON p.brand_id = b.id
        WHERE p.user_id = $1;
    `, [user_id]);
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
    get_character_by_id,
    get_characters_by_user,
    get_all_characters,
    get_brand_characters,
};
