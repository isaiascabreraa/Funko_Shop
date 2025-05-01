
const express = require('express');
const login_controllers = require('../controllers/login.controllers');
const router = express.Router();

router.get('/', login_controllers.login);

module.exports = router;