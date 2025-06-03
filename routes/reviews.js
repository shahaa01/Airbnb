const express = require('express');
const router = express.Router({mergeParams: true});
const asyncWrap = require('../utils/asyncWrap');
const middlewares = require('../middlewares/index');
const reviewController = require('../controllers/review');

//routes here to post the reviews
router.route('/')
    .post(middlewares.validateReviewSchema, asyncWrap(reviewController.postReview))

router.route('/delete')
    .delete(asyncWrap(reviewController.deleteReview));

module.exports = router;
