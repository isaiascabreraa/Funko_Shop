
const shop = async (req, res) => {
    const { get_all_characters } = require("../models/characters.model");
    const data = await get_all_characters();

    if (!data || data.length === 0) {
        return res.status(404).send("Producto no encontrado");
    }

    const characters = data
    const search = req.query.search;
    const sort   = req.query.sort;
    const range  = req.query.range;
    res.render('./pages/shop.ejs', { characters, search, sort, range });
}

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