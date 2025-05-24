const joi = require('joi');

const ListingServerSchema = joi.object({
    listing: joi.object({
    title: joi.string().required().messages({
        "string.base" : "Title must be alphabetical. Please enter valid title.",
        "string.empty" : "Title is required.",
        "any.required" : "Title is required."
    }),
    description: joi.string().required().messages({
        "string.base" : "Description must be alphabetical. Please enter valid description.",
        "string.empty" : "Description is required.",
        "any.required" : "Description is required."
    }),
    image: joi.object({
        filename: joi.string().optional(),
        url: joi.string().uri().allow("").default("https://www.shutterstock.com/image-photo/impressive-autumn-landscape-during-sunset-600nw-1459051037.jpg")
    }),
    price: joi.number().min(0).required().messages({
        "number.base" : "Price must be a Number. Please enter valid price.",
        "number.empty" : "Price is required.",
        "number.min" : "Price must be 0 or more.",
        "any.required" : "Price is required."
    }),
    location: joi.string().required().messages({
        "string.base" : "Location must be alphabetical. Please enter valid location.",
        "string.empty" : "Location is required.",
        "any.required" : "Location is required."
    }),
    country: joi.string().required().messages({
        "string.base" : "Country must be alphabetical. Please enter valid country name.",
        "string.empty" : "Country is required.",
        "any.required" : "Country is required."
    }),
    }).required()
});

module.exports = ListingServerSchema;