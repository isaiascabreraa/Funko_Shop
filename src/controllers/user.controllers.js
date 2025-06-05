
const account = (req, res) => {
    res.render('./pages/account.ejs');
}

const products = async (req, res) => {

    const { get_characters_by_user } = require('../models/characters.model');
    const data = await get_characters_by_user(req.session.user_id)

    const products = data[0]
    res.render('./pages/products.ejs', {products});
}

module.exports = {
    account,
    products
}