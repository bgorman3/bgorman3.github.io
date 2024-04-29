const express = require('express');
const router = express.Router({ mergeParams: true });
const { isSeller,isLoggedIn,isNotSeller} = require('../middlewares/auth');
const {validateAndSanitizeItem } = require('../middlewares/validator');

const offerController = require('../controllers/offerController');

router.post('/items/:id/offers',validateAndSanitizeItem,isLoggedIn,isSeller, offerController.makeOffer); // Route for making an offer
router.get('/items/:id/productoffers',  isNotSeller,offerController.viewAllOffers); // New route for viewing all offers on a specific item
router.patch('/:offerId/accept', offerController.acceptOffer);

router.get('/', offerController.viewAllOffers); // Route for viewing all offers
router.get('/items/:id/productoffers', isNotSeller, offerController.viewAllOffers);

// New route for viewing a specific offer

router.get('/:offerId', offerController.viewOffer);

module.exports = router;