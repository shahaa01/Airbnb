const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    listing: {
        type: Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 20
    },
    rating: {
        type: Number,
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;