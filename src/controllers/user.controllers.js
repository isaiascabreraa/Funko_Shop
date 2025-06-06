
const account = (req, res) => {
    res.render('./pages/account.ejs');
}

const products = async (req, res) => {

    const { get_characters_by_user } = require('../models/characters.model');
    const data = await get_characters_by_user(req.session.user_id)

    const products = data[0]
    res.render('./pages/products.ejs', {products});
}

const add_products = async (req, res) => {
    res.render('./pages/add_products.ejs');
}

const add_products_submit = async (req, res) => {

    const { add_character } = require('../models/characters.model');
    const data = req.body;
    const file = req.files;
    const user_id = req.session.user_id;

    //Hago los chequeos necesarios.
    //Si todo esta ok entonces...

    try {
        await add_character(data, file, user_id);
        return res.redirect('/shop');

    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al agregar el producto');
    }
}


module.exports = {
    account,
    products,
    add_products,
    add_products_submit
}