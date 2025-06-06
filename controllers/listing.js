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
    const requiredListing = await Listing.findById(id).populate('owner'); 
    if(!requiredListing) {
      return next(new ExpressErr(400, "URL is incorrect. Page not Found."));
    }    
    const reqReview = await Review.find({listing: id}).populate('author');

    res.render('pages/individualList', {list: requiredListing, reviews: reqReview});
}

module.exports.editListForm = async (req, res, next) => {
    const {id} = req.params;
    const requiredListing = await Listing.findById(id).populate('owner');
    if(!requiredListing) {
      return next(new ExpressErr(400, "URL is incorrect. Page not Found."));
    }
    if(!req.user._id.equals(requiredListing.owner._id)) {
      req.flash('failure', 'Access Denied, Login first');
      return res.redirect('/auth/login');
    } 
    res.render('pages/editForm', {listing: requiredListing});
  }

module.exports.updateForm = async (req, res, next ) => {
      const {id} = req.params;
      const requiredListing = await Listing.findById(id).populate('owner');
      if(!requiredListing) {
      return next(new ExpressErr(400, "Something went wrong - User ID is missing"));
      }
      if(!req.user._id.equals(requiredListing.owner._id)) {
        req.flash('failure', 'Access Denied, Login first');
        return res.redirect('/auth/login');
      } 
      await Listing.findByIdAndUpdate(id, req.body.listing);
      req.flash('success', 'Listing was updated successfully.');
      res.redirect(`/listing/show/${id}`);
  }

module.exports.newListForm = async (req, res, next) => {
  if(!req.user) {
    req.flash('failure', 'Access Denied, Login first');
    return res.redirect('/auth/login');
  }
  res.render('pages/newListingForm');
}

module.exports.postNewList = async(req, res, next) => {
  if(!req.user) {
    req.flash('failure', 'Access Denied, Login first');
    return res.redirect('/auth/login');
  }
  console.log(req.body.listing);
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  req.flash('success', 'New Listing Created Successfully!');
  res.redirect('/listing');
}

module.exports.deleteListing = async(req, res, next) => {
  const {id} = req.params;
  if(!(await Listing.findById(id))) {
    return next(new ExpressErr(400, "Something went wrong - User Id not Found."));
  }
  const reqListing = await Listing.findById(id).populate('owner');
  if(!req.user._id.equals(reqListing.owner._id)) {
    req.flash('failure', 'Access Denied, Login first');
    return res.redirect('/auth/login');
  }
  req.flash('success', 'Listing was deleted successfully.');
  res.redirect('/listing')
}