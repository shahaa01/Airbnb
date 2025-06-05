const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 1000
    },

    email: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.plugin(passportLocalMongoose); //passport local mongoose adds username and password fields on it own in the schema

const User = mongoose.model('User', userSchema);

module.exports = User;