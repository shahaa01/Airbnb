const express = require('express');
const router = express.Router();
const asyncWrap = require('../utils/asyncWrap');
const listingController = require('../controllers/listing');
const homeController = require('../controllers/home');

router.route('/')
    .get(asyncWrap(listingController.index));

router.route('/about')
    .get(homeController.about);


module.exports = router;