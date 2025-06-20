const express = require('express')
const authControllers = require('../controllers/auth.controllers')
const router = express.Router()

router.get('/login', authControllers.login)
router.post('/login', authControllers.loginSubmit)
router.get('/register', authControllers.register)
router.post('/register', authControllers.registerSubmit)
router.get('/logout', authControllers.logout)

module.exports = router
