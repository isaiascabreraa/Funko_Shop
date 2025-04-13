
const express = require('express');
const app = express();
const fs = require('fs');

const main_routes = require('./src/routes/main.routes');
const shop_routes = require('./src/routes/shop.routes');

const PORT = 14880

app.use(express.static('public'));

app.use('/shop', shop_routes);
app.use('/', main_routes);

/* De aca para abajo tengo que trasladarlo a routes*/

/*
app.get('/shop', (req, res) => {
    const data = fs.readFileSync(__dirname + '/src/data/shop_items.json');
    const shop_items = JSON.parse(data);
    
    if(req.query.search) {
        const search = req.query.search.toLowerCase();
        const shop_filtered = shop_items.filter(item => item.name.toLowerCase().includes(search));
        res.send(shop_filtered);

    } else {res.send(shop_items);}
})


app.get('/item/:id', (req, res) => {
    const data = fs.readFileSync(__dirname + '/src/data/items.json');
    const items = JSON.parse(data);
    const selected_items = items.find(item => item.id == req.params.id);
    res.send(selected_items);
})
*/


app.listen(PORT, ()=> console.log(`Servidor corriendo en http://localhost:${PORT}`));
