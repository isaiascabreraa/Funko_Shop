
const account = async (req, res) => {
    const { get_account_data } = require('../models/account.model');
    const result  = await get_account_data(req.session.user_id);

    if (result.status !== 'OK') {
         return res.redirect('/auth/login');
    }
    res.render('./pages/account.ejs', { user: result.user_data });
}

const products = async (req, res) => {
    const { get_characters_by_user } = require('../models/characters.model');
    const data = await get_characters_by_user(req.session.user_id)
    res.render('./pages/products.ejs', { products: data });
}

const add_products = async (req, res) => {
    res.render('./pages/add.ejs');
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