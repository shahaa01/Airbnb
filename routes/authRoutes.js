const express = require('express');
const User = require('../models/user');
const router = express.Router();
const asyncWrap = require('../utils/asyncWrap');
const authController = require('../controllers/auth');
const middlewares = require('../middlewares/index');

router.route('/signUp')
    .get(asyncWrap(authController.signUp))
    .post(middlewares.validateUserSchema, asyncWrap(authController.saveUser))



module.exports = router;