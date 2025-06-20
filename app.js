require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const { initSession, setIsLogged } = require('./src/utils/sessions')

const mainRoutes = require('./src/routes/main.routes')
const shopRoutes = require('./src/routes/shop.routes')
const dataRoutes = require('./src/routes/data.routes')
const authRoutes = require('./src/routes/auth.routes')
const userRoutes = require('./src/routes/user.routes')

// Information
const IP = process.env.IP || '0.0.0.0'
const PORT = process.env.PORT

// Template Engines
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, './src/views'))

app.use(express.static('public'))
app.use(express.urlencoded())
app.use(initSession())
app.use(setIsLogged())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/shop', shopRoutes)
app.use('/data', dataRoutes)
app.use('/', mainRoutes)

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://${IP}:${PORT}`)
})

module.exports = { app, server }
