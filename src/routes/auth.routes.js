
const express = require('express');
const auth_controllers = require('../controllers/auth.controllers');
const router = express.Router();

router.get('/login', auth_controllers.login);
router.post('/login', auth_controllers.login_submit);
router.get('/register', auth_controllers.register);
router.post('/register', auth_controllers.register_submit);
router.get('/logout', auth_controllers.logout);

module.exports = router;