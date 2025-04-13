
const path = require('path');

module.exports = {
    shop: (req, res) => res.render(path.resolve(__dirname, '../views/pages/shop.ejs')),
    item: (req, res) => { res.render(path.resolve(__dirname, '../views/pages/item.ejs'));}
}