const ListingServerSchema = require('../Validations/listingSchemaValidation');
const ExpressErr = require('../errors/expressErr');
const ReviewServerSchema = require('../Validations/reviewSchemaValidation');
const Listing = require('../models/listing');
const UserServerSchema = require('../Validations/userSchemaValidations');

module.exports.validateListingSchema = (req, res, next) => {
  let {error} = ListingServerSchema.validate(req.body);
  if(error) {
    return next(new ExpressErr(400, error.details[0].message, req.originalUrl));
  } 
  next();
};

module.exports.validateReviewSchema = async (req, res, next) => {
  const {id} = req.params;
  const requiredListing = await Listing.findById(id);
  if(!requiredListing) {
    return next(new ExpressErr(400, "No Listing was Found for the given Listing ID"));
  }
  req.body.review.listing = requiredListing;
  let {error} = ReviewServerSchema.validate(req.body);
  if(error) {
    return next(new ExpressErr(400, error.details[0].message, `/listing/show/${id}`));
  }
  next();
};

module.exports.localStore = (req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.failure = req.flash('failure');
  res.locals.error = req.flash('error'); // this is what passport uses
  res.locals.currUser = req.user;
  next();
};

module.exports.validateUserSchema = (req, res, next) => {
  let {error} = UserServerSchema.validate(req.body);
  if(error) {
    return next(new ExpressErr(400, error.details[0].message, '/auth/signUp'));
  }
  next();
}

module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return next(new ExpressErr(401, 'Access Denied! You have to login first', '/auth/login'));
  }

  next();
}