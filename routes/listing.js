const express = require('express');
const router = express.Router({mergeParams: true}); //stores the req.params of the parent route
const asyncWrap = require('../utils/asyncWrap');
const Listing = require('../models/listing');
const ExpressErr = require('../errors/expressErr');
const ListingServerSchema = require('../Validations/listingSchemaValidation');

//middleware function to validate schemas
const validateSchema = (req, res, next) => {
  let {error} = ListingServerSchema.validate(req.body);
  if(error) {
    return next(new ExpressErr(400, error.details[0].message, req.originalUrl));
  } 
  next();
}

//all the listing routes
//home route - which will show all the listings 
router.get('/', asyncWrap(async (req, res) => {
    const data = await Listing.find({});
    res.render('pages/index', {
      data
    });
}));

//route to show individual listing
router.get('/show/:id', asyncWrap(async(req, res, next) => {
    const {id} = req.params;
    const requiredListing = await Listing.findById(id); 
    if(!requiredListing) {
      return next(new ExpressErr(400, "URL is incorrect. Page not Found."));
    } 
    res.render('pages/individualList', {list: requiredListing});
}));

//route to get edit form 
router.get('/editList/:id', asyncWrap(async (req, res, next) => {
  const {id} = req.params;
  const requiredListing = await Listing.findById(id);
  if(!requiredListing) {
    return next(new ExpressErr(400, "URL is incorrect. Page not Found."));
  } 
  res.render('pages/editForm', {listing: requiredListing});
}));

//route to update from the edit form
router.put('/editList/:id', validateSchema, asyncWrap(async (req, res, next ) => {
    const {id} = req.params;
    const requiredListing = await Listing.findByIdAndUpdate(id, req.body.listing);
    if(!requiredListing) {
    return next(new ExpressErr(400, "Something went wrong - User ID is missing"));
    }
    res.redirect(`/listing/show/${id}`);
}));

//route to show add new list form
router.get('/addList', asyncWrap(async (req, res, next) => {
  res.render('pages/newListingForm');
}));

//route to add in the db
router.post('/addList', validateSchema, asyncWrap(async(req, res, next) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect('/listing');
}));

//route to delete
router.delete('/deleteList/:id', asyncWrap(async(req, res, next) => {
  const {id} = req.params;
  if(!(await Listing.findById(id))) {
    return next(new ExpressErr(400, "Something went wrong - User Id not Found."));
  }
  await Listing.findByIdAndDelete(id);
  res.redirect('/listing')
}));

module.exports = router;