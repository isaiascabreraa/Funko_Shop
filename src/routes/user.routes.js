
const express = require('express');
const user_controllers = require('../controllers/user.controllers');
const router = express.Router();

router.get('/account', user_controllers.account);
router.get('/products', user_controllers.products);
router.get('/add_products', user_controllers.add_products);
router.post('/add_products', user_controllers.add_products_submit);

module.exports = router;