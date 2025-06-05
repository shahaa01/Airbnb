const express = require('express');
const router = express.Router({mergeParams: true}); //stores the req.params of the parent route
const asyncWrap = require('../utils/asyncWrap');
const listingController = require('../controllers/listing');
const middlewares = require('../middlewares/index');

//home route - which will show all the listings 
router.get('/', asyncWrap(listingController.index));

//route to show individual listing
router.route('/show/:id')
  .get(asyncWrap(listingController.showListing));

//route to get edit and update the form 
router
.route('/editList/:id')
  .get(asyncWrap(listingController.editListForm))
  .put(middlewares.isLoggedIn ,middlewares.validateListingSchema, asyncWrap(listingController.updateForm));

//route to show add new list form and also post in the db
router.route('/addList')
  .get(asyncWrap(listingController.newListForm))
  .post(middlewares.isLoggedIn ,middlewares.validateListingSchema , asyncWrap(listingController.postNewList));

//route to delete
router.delete('/deleteList/:id', middlewares.isLoggedIn ,asyncWrap(listingController.deleteListing));

module.exports = router;