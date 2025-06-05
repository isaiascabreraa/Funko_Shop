
const home = async (req, res) => {
    const { get_all_characters } = require("../models/characters.model");
    const data = await get_all_characters();

    if (!data || data.length === 0) {
        return res.status(404).send("Productos no encontrados");
    }

    const target = ['Baby Yoda Blue Ball', 'Charmander', 'Harry Potter'];
    const featured_characters = data.filter(char => target.includes(char.name));

    res.render('home.ejs', { featured_characters });
}

module.exports = {
    home,
}