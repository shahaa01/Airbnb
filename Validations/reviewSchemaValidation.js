const joi = require('joi');

const reviewServerSchema = joi.object({
    review: joi.object({
        author: joi.string()
        .required()
        .custom(onlyNumbers)
        .messages({
            "string.onlyNumbers" : "Not a valid Author name. Please enter a valid author name.",
            "string.base" : "Not a valid Author name. Please enter a valid author name.",
            "string.empty" : "Author name is required, it cannot be empty.",
            "any.required" : "Author name is required, it cannot be empty"
        }),

        listing: joi.required(),

        description: joi.string()
        .max(1000)
        .required()
        .custom(onlyNumbers)
        .messages({
            "string.onlyNumbers" :  "Description must be alphabetical. Please enter a valid description.",
            "string.base" : "Description must be alphabetical. Please enter a valid description.",
            "string.length" : "Length exceeded the word limit of 1000 characters",
            "any.required" : "Description is required."
        }),

        rating: joi.number()
        .min(1)
        .max(5)
        .required()
        .messages({
            "number.base" : "Rating must be numeric.",
            "number.min" : "Rating cannot be lower than 1.",
            "number.max" : "Rating cannot be greater than 5",
            "any.required" : "User rating is required."
        })

    }).required()
})

function onlyNumbers(value, helper) {
    if(/^\d+$/.test(value)) {
        return helper.error("string.onlyNumbers");
    }

    return value;
}

module.exports = reviewServerSchema;