require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const { init_session, set_is_logged } = require('./utils/sessions')

const main_routes = require('./routes/main.routes')
const shop_routes = require('./routes/shop.routes')
const data_routes = require('./routes/data.routes')
const auth_routes = require('./routes/auth.routes')
const user_routes = require('./routes/user.routes')

// Template Engines
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, './views'))

app.use(express.static('public'))
app.use(express.urlencoded())
app.use(init_session())
app.use(set_is_logged())

app.use('/auth', auth_routes)
app.use('/user', user_routes)
app.use('/shop', shop_routes)
app.use('/data', data_routes)
app.use('/', main_routes)

module.exports = { app }
