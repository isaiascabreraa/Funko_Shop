
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

    const { get_character, get_featured_characters } = require("../models/characters.model");
    const data = await get_character(req.params.id);
    const data_featured = await get_featured_characters();

    console.log(`Id solicitado: ${req.params.id}`)

    if (!data || data.length === 0) {
        return res.status(404).send("Producto no encontrado");
    
    } else{
        const character = data[0]
        const featured_characters = data_featured;
        res.render('./pages/item.ejs', { character, featured_characters });
    }
}

module.exports = {
    shop,
    item
}