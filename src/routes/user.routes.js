
const express = require('express');
const router = express.Router();

const user_controllers = require('../controllers/user.controllers');
const upload_img = require('../config/storage_img');

router.get('/account', user_controllers.account);
router.get('/products', user_controllers.products);
router.get('/add_products', user_controllers.add_products);
router.post('/add_products', upload_img.array('imagenes', 5), user_controllers.add_products_submit);

module.exports = router;