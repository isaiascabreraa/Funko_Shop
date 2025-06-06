
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

const add_character = async (data, files, user_id) => {

    let brandResult = await conn.query(
        `SELECT id FROM brands WHERE name = $1`,[data.marca]);

    let brand_id;
    if (brandResult.rows.length > 0) {
        brand_id = brandResult.rows[0].id;

    } else {
        const newBrand = await conn.query(`INSERT INTO brands (name) VALUES ($1) RETURNING id`,[data.marca]);
        brand_id = newBrand.rows[0].id;
    }

    const payments = data.cuotas + ' CUOTAS SIN INTERES';
    const result = await conn.query(
        `INSERT INTO products (brand_id, name, price, payments, description, stock, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id`,
        [brand_id, data.nombre, data.precio, payments, data.descripcion, data.stock, user_id]);

    const productId = result.rows[0].id;
    if (files && files.length > 0) {
        const primary_image = '../../Multimedia/FunkosInterior/' + files[0].originalname;

        console.log("El path es:", primary_image);
        await conn.query(
        `INSERT INTO content (product_id, primary_image)
        VALUES ($1, $2)`,
        [productId, primary_image]);
    }

    return productId;
};


module.exports = {
    get_character_by_id,
    get_characters_by_user,
    get_all_characters,
    get_brand_characters,
    add_character
};
