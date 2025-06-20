const express = require('express')
const mainControllers = require('../controllers/main.controllers')
const router = express.Router()

router.get('/', mainControllers.home)

module.exports = router
