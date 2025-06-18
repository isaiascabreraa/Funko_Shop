
const shop = async (req, res) => {

    try {
        const { get_characters, count_characters } = require("../models/characters.model");

        const { search, sort } = req.query;
        const min_price = req.query.min_price ? Number(req.query.min_price) : null;
        const max_price = req.query.max_price ? Number(req.query.max_price) : null;

        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 9;
        const offset = (page - 1) * limit;

        const [characters, total] = await Promise.all([
            get_characters({ search, sort, min_price, max_price, limit, offset }),
            count_characters({ search, min_price, max_price })
        ]);

        const total_pages = Math.ceil(total / limit);
    
        res.render('./pages/shop.ejs', { characters, search, sort, min_price, max_price, page, total_pages });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};

const item = async (req, res) => {
    const { get_character_by_id, get_brand_characters } = require("../models/characters.model");

    const data = await get_character_by_id(req.params.id);
    if (!data || data.length === 0) {
        return res.status(404).send("Producto no encontrado");
    }
    const data_featured = await get_brand_characters(data[0].brand_name);

    const character = data[0];
    const carousel_products = data_featured.filter(item => item.id !== character.id);

    res.render('./pages/item.ejs', { character, carousel_products });
}

module.exports = {
    shop,
    item
}