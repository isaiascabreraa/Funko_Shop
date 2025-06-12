
const express = require('express');
const shop_controllers = require('../controllers/shop.controllers');
const router = express.Router();

router.get('/item/:id', shop_controllers.item);
router.get('/', shop_controllers.shop);

module.exports = router;