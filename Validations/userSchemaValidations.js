const joi = require('joi');
const User = require('../models/user');

const userServerSchema = joi.object({
    user: joi.object({
        name: joi.string()
        .required()
        .custom(containsDigit)
        .messages({
            'string.containsDigit' : 'Invalid name. Please enter a valid alphabetical name.',
            'string.base' : 'Invalid name. Please enter a valid alphabetical name.',
            'string.empty' : 'Name field cannot be empty. Please enter a valid name.',
            'any.required' : 'Name field cannot be empty. Please enter a valid name.'
        }),
        username: joi.string()
        .custom(onlyNumbers)
        .required()
        .messages({
            'string.onlyNumbers' : 'Username cannot just be a number. Please enter a valid alphanumeric or alphabetical username.',
            'string.base' : 'Please enter a valid alphanumeric or alphabetical username.',
            'string.empty' : 'Username field cannot be empty. Please enter a valid username.',
            'any.required' : 'Username field cannot be empty. Please enter a valid username.'
        }),
        email: joi.string()
        .email({tlds: {allow: false}}) //only during development for testing purposes
        .required()
        .messages({
            'string.email' : 'Please enter a valid email address.',
            'string.base' : 'Please enter a valid email address.',
            'string.empty' : 'Email field cannot be empty. Please enter a valid email.',
            'any.required' : 'Email field cannot be empty. Please enter a valid email.'
        }),
        password: joi.string()
        .min(6)
        .max(20)
        .required()
        .messages({
            'string.base': 'Password must be a valid text string.',
            'string.empty': 'Password field cannot be empty. Please enter a valid password.',
            'string.min': 'Password must be at least 6 characters long.',
            'string.max': 'Password must not exceed 20 characters.',
            'any.required': 'Password is required. Please enter a valid password.',
        }),
        confirmPassword: joi.string()
        .required()
    }).required()
})

function containsDigit(value, helper) {
    if(/\d+/.test(value)) {
        return helper.error('string.containsDigit');
    }

    return value;
}

function onlyNumbers(value, helper) {
    if(/^\d+$/.test(value)) {
        return helper.error('string.onlyNumbers');
    }

    return value;
}


module.exports = userServerSchema;