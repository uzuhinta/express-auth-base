const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { verifyAccessToken } = require('../services/jwt.service');

router.get('/', verifyAccessToken, UserController.getUser);

module.exports = router;
