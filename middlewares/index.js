const ListingServerSchema = require('../Validations/listingSchemaValidation');
const ExpressErr = require('../errors/expressErr');
const Review = require('../models/review');
const ReviewServerSchema = require('../Validations/reviewSchemaValidation');
const Listing = require('../models/listing');

module.exports.validateListingSchema = (req, res, next) => {
  let {error} = ListingServerSchema.validate(req.body);
  if(error) {
    return next(new ExpressErr(400, error.details[0].message, req.originalUrl));
  } 
  next();
}

module.exports.validateReviewSchema = async (req, res, next) => {
  const {id} = req.params;
  const requiredListing = await Listing.findById(id);
  if(!requiredListing) {
    return next(new ExpressErr(400, "No Listing was Found for the given Listing ID"));
  }
  req.body.review.listing = requiredListing;
  let {error} = ReviewServerSchema.validate(req.body);
  if(error) {
    return next(new ExpressErr(400, error.details[0].message, req.originalUrl));
  }
  next();
}