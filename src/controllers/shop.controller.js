
const shop = async (req, res) => {
    const { get_characters } = require("../models/characters.model");
    const data = await get_characters();

    if (!data || data.length === 0) {
        return res.status(404).send("Producto no encontrado");
    } else{
        const characters = data
        res.render('./pages/shop.ejs', { characters });
    }
}

const item = async (req, res) => {

    const { get_character, get_brand_characters } = require("../models/characters.model");

    const data = await get_character(req.params.id);
    if (!data || data.length === 0) {
        return res.status(404).send("Producto no encontrado");
    }
    const data_featured = await get_brand_characters(data[0].brand_name);

    const character = data[0];
    const brand_characters = data_featured.filter(item => item.id !== character.id);

    res.render('./pages/item.ejs', { character, brand_characters });
}

module.exports = {
    shop,
    item
}