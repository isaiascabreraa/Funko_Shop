
const home = async (req, res) => {
    const { get_all_characters } = require("../models/characters.model");
    const data = await get_all_characters();

    if (!data || data.length === 0) {
        return res.status(404).send("Productos no encontrados");
    }

    const target = ['Baby Yoda Blue Ball', 'Charmander', 'Harry Potter'];
    const featured_characters = data.filter(char => target.includes(char.name));

    const carousel_products = data.filter(char => !target.includes(char.name)).slice(0,8);

    res.render('home.ejs', { featured_characters, carousel_products });
}

module.exports = {
    home,
}