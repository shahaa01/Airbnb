const mongoose = require('mongoose');
const Schema = mongoose.schema;

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
        set: (v) => v.trim() === '' ? "https://www.shutterstock.com/image-photo/fantastic-evening-kirkjufell-volcano-coast-260nw-530221900.jpg" : v
    },
    price: Number,
    location: String,
    Country: String
});

const Listing = mongoose.Model('listing', listSchema);

modules.export = Listing;