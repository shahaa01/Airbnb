const mongoose = require('mongoose');
const Listing = require('../models/listing')
const {Schema} = mongoose;

const reviewSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    listing: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Listing'
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    rating: {
        type: Number,
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;