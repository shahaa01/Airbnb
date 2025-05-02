const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://www.shutterstock.com/image-photo/fantastic-evening-kirkjufell-volcano-coast-260nw-530221900.jpg",
        set: (v) => (v && v.trim() !== ('')) ? v : undefined
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
    space : {
        type: String,
        enum: ['entire place', 'private room'],
        set: (v) => v.trim().toLowerCase()
    }
});

const Listing = mongoose.model('listing', listSchema);

module.exports = Listing;