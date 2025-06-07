const ExpressErr = require('../errors/expressErr');
const User = require('../models/user');
const passport = require('passport');
const asyncWrap = require('../utils/asyncWrap');
const flash = require('connect-flash');


module.exports.signUp = async(req, res) => {
    res.render('pages/signUpForm');
}

module.exports.saveUser = async(req, res, next) => {
    try{
    if(req.body.user.password !== req.body.user.confirmPassword) {
        return next(new ExpressErr(400, 'Passwords did not match, please type correctly!', '/auth/signUp'));
    }
    const user = {...req.body.user};
    delete user.password;
    delete user.confirmPassword;
    const registeredUser = await User.register(new User(user), req.body.user.password);
    req.login(registeredUser, (err) => {
        if(err)
            return next(err);
        req.flash('success', `Welcome to StayNest, ${registeredUser.name}!`);
        res.redirect('/listing');
    })
    } catch(err) {
        if(err.code === 11000 && err.keyPattern?.email) {
            return next(new ExpressErr(400, 'Email is already registered.', '/auth/signUp'));
        }
        
        return next(new ExpressErr(400, err.message, '/auth/signUp'));
    }
};

module.exports.loginForm = async(req, res, next) => {
    res.render('pages/loginForm');
};

module.exports.loginUser = (req, res, next) => {
    req.flash('success', `Welcome back ${req.user.name} !`);
    const redirectUrl = res.locals?.redirectUrl;
    res.redirect(redirectUrl || '/listing');
}

module.exports.logout = (req, res, next) => {
    if(req.isAuthenticated()) {
        return req.logout((err) => {
            if(err) {
                return next(err);
            }

            req.flash('success', 'Logged out successfully!');
            return res.redirect('/listing');
        })
    }

    req.flash('failure','User needs to be logged in first.');
    return res.redirect('/auth/login');
};