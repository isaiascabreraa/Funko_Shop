const express = require('express')
const data_controllers = require('../controllers/data.controllers')
const router = express.Router()

router.get('/characters', data_controllers.getDataCharacters)

module.exports = router
