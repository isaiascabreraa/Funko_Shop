
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const { init_session, set_is_logged } = require('./src/utils/sessions');

const main_routes = require('./src/routes/main.routes');
const shop_routes = require('./src/routes/shop.routes');
const data_routes = require('./src/routes/data.routes');
const auth_routes = require('./src/routes/auth.routes');
const user_routes = require('./src/routes/user.routes');

//Information
const IP = process.env.IP || '0.0.0.0'
const PORT = process.env.PORT

//Template Engines
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(init_session());
app.use(set_is_logged());

app.use('/auth', auth_routes);
app.use('/user', user_routes);
app.use('/shop', shop_routes);
app.use('/data', data_routes);
app.use('/', main_routes);

app.listen(PORT, ()=> console.log(`Servidor corriendo en http://${IP}:${PORT}`));