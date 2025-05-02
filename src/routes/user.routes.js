
const express = require('express');
const user_controllers = require('../controllers/user.controllers');
const router = express.Router();

router.get('/account', user_controllers.account);

module.exports = router;