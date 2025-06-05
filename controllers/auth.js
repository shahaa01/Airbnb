const ExpressErr = require('../errors/expressErr');
const User = require('../models/user');
const passport = require('passport');


module.exports.signUp = async(req, res) => {
    res.render('pages/signUpForm');
}

module.exports.saveUser = async(req, res) => {
    const user = {...req.body.user};
    delete user.password;
    delete user.confirmPassword;
    const registeredUser = User.register(new User(user), req.body.user.password);
    res.send(registeredUser);
}