
const express = require('express');
const app = express();
const fs = require('fs');

const main_routes = require('./src/routes/main.routes');
const shop_routes = require('./src/routes/shop.routes');

const PORT = 14880

app.use(express.static('public'));

app.use('/shop', shop_routes);
app.use('/', main_routes);

app.listen(PORT, ()=> console.log(`Servidor corriendo en http://localhost:${PORT}`));
