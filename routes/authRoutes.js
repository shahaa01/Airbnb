const express = require('express');
const router = express.Router();
const asyncWrap = require('../utils/asyncWrap');
const authController = require('../controllers/auth');
const middlewares = require('../middlewares/index');
const passport = require('passport');

router.route('/signUp')
    .get(asyncWrap(authController.signUp))
    .post(middlewares.validateUserSchema, asyncWrap(authController.saveUser))


router.route('/login')
    .get(asyncWrap(authController.loginForm))
    .post(passport.authenticate('local', {failureRedirect: '/auth/login', failureFlash: true}), authController.loginUser);


router.route('/logout') 
    .get(authController.logout);



module.exports = router;