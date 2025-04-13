
const express = require('express');
const main_controllers = require('../controllers/main.controllers');
const router = express.Router();

router.get('/home', main_controllers.home);

module.exports = router;