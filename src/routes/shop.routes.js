const express = require('express')
const shopControllers = require('../controllers/shop.controllers')
const router = express.Router()

router.get('/item/:id', shopControllers.item)
router.get('/', shopControllers.shop)

module.exports = router
