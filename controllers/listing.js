const Listing = require('../models/listing');
const ExpressErr = require('../errors/expressErr');
const Review = require('../models/review');

module.exports.index = async (req, res) => {
    const data = await Listing.find({});
    res.render('pages/index', {
      data
    });
}

module.exports.showListing = async(req, res, next) => {
    const {id} = req.params;
    const requiredListing = await Listing.findById(id); 
    if(!requiredListing) {
      return next(new ExpressErr(400, "URL is incorrect. Page not Found."));
    }
    const allReview = await Review.find({});
    let reqReview = [];
    allReview.forEach((review) => {
      if(review.listing.equals(id + "")) {
        reqReview.push(review);
      }
    });
    res.render('pages/individualList', {list: requiredListing, reviews: reqReview});
}

module.exports.editListForm = async (req, res, next) => {
    const {id} = req.params;
    const requiredListing = await Listing.findById(id);
    if(!requiredListing) {
      return next(new ExpressErr(400, "URL is incorrect. Page not Found."));
    } 
    res.render('pages/editForm', {listing: requiredListing});
  }

module.exports.updateForm = async (req, res, next ) => {
      const {id} = req.params;
      const requiredListing = await Listing.findByIdAndUpdate(id, req.body.listing);
      if(!requiredListing) {
      return next(new ExpressErr(400, "Something went wrong - User ID is missing"));
      }
      res.redirect(`/listing/show/${id}`);
  }

module.exports.newListForm = async (req, res, next) => {
  res.render('pages/newListingForm');
}

module.exports.postNewList = async(req, res, next) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect('/listing');
}

module.exports.deleteListing = async(req, res, next) => {
  const {id} = req.params;
  if(!(await Listing.findById(id))) {
    return next(new ExpressErr(400, "Something went wrong - User Id not Found."));
  }
  await Listing.findByIdAndDelete(id);
  res.redirect('/listing')
}