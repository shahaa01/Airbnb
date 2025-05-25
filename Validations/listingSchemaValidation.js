const joi = require('joi');

const ListingServerSchema = joi.object({
    listing: joi.object({
    title: joi.string().required().custom(customValidator).messages({
        "string.onlyNumbers" : "Title must be alphabetical. Please enter a valid title.",
        "string.base" : "Title must be alphabetical. Please enter a valid title.",
        "string.empty" : "Title is required.",
        "any.required" : "Title is required."
    }),
    description: joi.string().custom(customValidator).required().messages({
        "string.onlyNumbers" : "Description must be alphabetical. Please enter a valid description.",
        "string.base" : "Description must be alphabetical. Please enter a valid description.",
        "string.empty" : "Description is required.",
        "any.required" : "Description is required."
    }),
    image: joi.object({
        filename: joi.string().custom(customValidator).optional().messages({
            "string.onlyNumbers" : "Filename must be alphabetical. Please enter a valid filename.",
        }),
        url: joi.string().uri().allow("").default("https://www.shutterstock.com/image-photo/impressive-autumn-landscape-during-sunset-600nw-1459051037.jpg")
    }).optional(),
    price: joi.number().min(0).required().custom((value, helper) => {
        if(/^[a-zA-Z]+/.test(value)) {
            return helper.error("number.onlyAlphabets");
        }
        return value;
    }).messages({
        "number.onlyAlphabets" : "Price must be a Number. Please enter a valid price.",
        "number.base" : "Price must be a Number. Please enter a valid price.",
        "number.empty" : "Price is required.",
        "number.min" : "Price must be 0 or more.",
        "any.required" : "Price is required."
    }),
    location: joi.string().custom(customValidator).required().messages({
        "string.onlyNumbers" : "Location must be alphabetical. Please enter a valid location.",
        "string.base" : "Location must be alphabetical. Please enter a valid location.",
        "string.empty" : "Location is required.",
        "any.required" : "Location is required."
    }),
    country: joi.string().custom((value, helper) => {
    if(/^\d+/.test(value)){
        return helper.error("string.onlyNumbers");
    } 

    return value;
    }).required().messages({
        "string.onlyNumbers" : "Country must be alphabetical. Please enter a valid country name.",
        "string.base" : "Country must be alphabetical. Please enter a valid country name.",
        "string.empty" : "Country is required.",
        "any.required" : "Country is required."
    }),
    }).required()
});

function customValidator(value, helper) {
    if(/^\d+$/.test(value)){
        return helper.error("string.onlyNumbers");
    } 

    return value;
    }

module.exports = ListingServerSchema;