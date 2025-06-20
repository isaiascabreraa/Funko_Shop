const express = require('express')
const router = express.Router()

const userControllers = require('../controllers/user.controllers')
const uploadImg = require('../config/storage_img')

router.get('/account', userControllers.account)
router.get('/products', userControllers.products)
router.get('/add', userControllers.addProducts)
router.post('/add', uploadImg.array('imagenes', 5), userControllers.addProductsSubmit)

module.exports = router
