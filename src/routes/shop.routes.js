
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, '../../public/HTML/shop.html'));})

router.get('/item:id', (req, res) => {
    const data = fs.readFileSync('../data/items.json');
    const items = JSON.parse(data);
    const selected_items = items.find(item => item.id == req.params.id);
    res.send(selected_items);
})

module.exports = router;