
const express = require('express');
const api_controllers = require('../controllers/api.controllers');
const router = express.Router();

router.get('/characters', api_controllers.getCharactersApi);

module.exports = router;