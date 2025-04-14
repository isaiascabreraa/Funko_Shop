
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

const main_routes = require('./src/routes/main.routes');
const shop_routes = require('./src/routes/shop.routes');

//Information
const PORT = 14880

//Template Engines
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

app.use(express.static('public'));

app.use('/shop', shop_routes);
app.use('/', main_routes);

app.listen(PORT, ()=> console.log(`Servidor corriendo en http://localhost:${PORT}`));
