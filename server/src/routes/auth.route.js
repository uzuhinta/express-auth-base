const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const validator = require('../middleware/validator');

router.post('/register', validator('register'), AuthController.register);

router.post('/refresh-token', AuthController.refreshToken);

router.post('/login', validator('login'), AuthController.login);

router.post('/logout', AuthController.logout);

module.exports = router;
