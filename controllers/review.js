const Review = require('../models/review');

module.exports.postReview = async(req, res) => {
    if(!req.user) {
        req.flash('failure', 'Access Denied, Login first');
        return res.redirect('/auth/login');
    }
    const {id} = req.params;
    const newReview = new Review(req.body.review);
    await newReview.save();
    console.log(newReview);
    req.flash('success', 'Your review was added successfully!')
    res.redirect(`/listing/show/${id}`);
}

module.exports.deleteReview = async(req, res) => {
    const {id} = req.params;
    const reqReview = await Review.findById(id).populate('author');
    if(!req.user._id.equals(reqReview.author._id)) {
        req.flash('failure', 'Access Denied, Login first');
        return res.redirect('/auth/login');
    }
    const reqListingId = reqReview.listing; 
    await Review.findByIdAndDelete(id);
    req.flash('success', 'Your review was deleted successfully!')
    res.redirect(`/listing/show/${reqListingId}`);
}