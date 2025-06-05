const ExpressErr = require('../errors/expressErr');
const User = require('../models/user');
const passport = require('passport');
const asyncWrap = require('../utils/asyncWrap');
const flash = require('connect-flash');


module.exports.signUp = async(req, res) => {
    res.render('pages/signUpForm');
}

module.exports.saveUser = asyncWrap(async(req, res, next) => {
    if(req.body.user.password !== req.body.user.confirmPassword) {
        return next(new ExpressErr(400, 'Passwords did not match, please type correctly!', '/auth/signUp'));
    }
    const user = {...req.body.user};
    delete user.password;
    delete user.confirmPassword;
    const registeredUser = await User.register(new User(user), req.body.user.password);
    req.flash('success', `Welcome to airbnb, ${registeredUser.name}!`);
    res.redirect('/listing');
});