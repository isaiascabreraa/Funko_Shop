
const account = (req, res) => {
    res.render('./pages/account.ejs');
}

const products = (req, res) => {
    res.render('./pages/products.ejs');
}

module.exports = {
    account,
    products
}