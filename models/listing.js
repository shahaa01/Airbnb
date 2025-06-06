const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defaultImageLink = "https://www.shutterstock.com/image-photo/impressive-autumn-landscape-during-sunset-600nw-1459051037.jpg";
const User = require('../models/user');

//lets define our Schema
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        filename : {
            type: String
        },
        url: {
            type: String,
            default: defaultImageLink,
            set: (v) => (v.trim() === "" || v === "") ? defaultImageLink : v
        }
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

//lets create a model - its like a tool that lets you have CRUD operations on documents based on Schema
const Listing = mongoose.model('listing', listingSchema);

module.exports = Listing;