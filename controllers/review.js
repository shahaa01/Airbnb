const Review = require('../models/review');

module.exports.postReview = async(req, res) => {
    const {id} = req.params;
    const newReview = new Review(req.body.review);
    await newReview.save();
    res.redirect(`/listing/show/${id}`);
}

module.exports.deleteReview = async(req, res) => {
    const {id} = req.params;
    const reqReview = await Review.findById(id);
    const reqListingId = reqReview.listing; 
    await Review.findByIdAndDelete(id);
    res.redirect(`/listing/show/${reqListingId}`);
}