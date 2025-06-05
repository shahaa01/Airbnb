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
        email: joi.string()
        .custom(notValidEmail)
        .required()
        .messages({
            'string.notValidEmail' : 'Please enter a valid email address.',
            'string.base' : 'Please enter a valid email address.',
            'string.empty' : 'Email field cannot be empty. Please enter a valid email.',
            'any.required' : 'Email field cannot be empty. Please enter a valid email.'
        })
        
    }).required()
})

function containsDigit(value, helper) {
    if(/\d+/.test(value)) {
        return helper.error('string.containsDigit');
    }

    return value;
}

function notValidEmail(value, helper) {
    if(/[\w.@-]+/.test(value)) {
        return value;
    }

    return helper.error('string.notValidEmail');
}

module.exports = userServerSchema;