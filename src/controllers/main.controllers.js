
const home = async (req, res) => {
    const { get_characters } = require("../models/characters.model");
    const data = await get_characters();

    if (!data || data.length === 0) {
        return res.status(404).send("Producto no encontrado");
    } else{
        const featured_characters = data.slice(0, 3)
        res.render('home.ejs', { featured_characters });
    }
}

module.exports = {
    home,
}