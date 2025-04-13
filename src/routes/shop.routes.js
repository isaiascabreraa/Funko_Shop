
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/item/:id', (req, res) => { res.sendFile(path.resolve(__dirname, '../../public/HTML/item.html'));})
router.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, '../../public/HTML/shop.html'));})

module.exports = router;