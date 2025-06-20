const express = require('express')
const dataControllers = require('../controllers/data.controllers')
const router = express.Router()

router.get('/characters', dataControllers.getDataCharacters)

module.exports = router
