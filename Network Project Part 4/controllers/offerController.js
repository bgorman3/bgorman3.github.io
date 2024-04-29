const Offer = require('../models/offerModel');
const Item = require('../models/itemModel');

const User = require('../models/userModel');
exports.makeOffer = (req, res, next) => {
    res.send('Make offer');
};

exports.viewOffer = function(req, res) {
    const offerId = req.params.offerId;

    // Fetch the offer from the database
    Offer.findById(offerId)
        .then(offer => {
            if (!offer) {
                res.status(404).send('Offer not found');
            } else {
                // Render the offer.ejs view with the offer
                res.render('offers', { offer: offer });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error occurred while fetching offer');
        });
};

exports.acceptOffer = (req, res, next) => {
    const offerId = req.params.offerId;
    
    console.log('offerId:', offerId);

    // Find the offer and update its status to 'accepted'
    Offer.findByIdAndUpdate(offerId, { status: 'accepted' }, { new: true })
        .then(acceptedOffer => {
            // Find the item related to the offer and set its 'active' field to false
            Item.findByIdAndUpdate(acceptedOffer.item, { active: false }, { new: true })
                .then(() => {
                    // Remove the other offers for the item
                    Offer.deleteMany({ item: acceptedOffer.item, _id: { $ne: offerId } })
                        .then(() => {
                            // Redirect the user to the profile page
                            res.redirect('/user/profile');
                        })
                        .catch(err => next(err));
                })
                .catch(err => next(err));
        })
        .catch(err => next(err));
};

exports.getOffers = function(req, res, next) {
    const offerId = req.params.id;

    Offer.findById(offerId)
        .then(offer => {
            if (!offer) {
                return res.status(404).send('Offer not found');
            }

            res.render('offer', { offer: offer }); // Render the offer.ejs page with the retrieved offer
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
};

exports.viewAllOffers = (req, res, next) => {
    // Retrieve the offers from the database
    Offer.find({ item: req.params.id })
        .populate('user') // Populate the user information for each offer
        .sort({ amount: -1 }) // Sort the offers by price in descending order
        .then(offers => {
            console.log(offers); // Log the offers here
            // Render the productoffers page, passing the offers to it
            res.render('productoffers', { offers: offers });
        })
        .catch(err => {
            // Handle any errors
            next(err);
        });
};

/*
exports.createOffer = function(req, res) {
    console.log(req.body)
    const offerAmount = req.body.offerAmount;

    const newOffer = new Offer({
        amount: offerAmount,
        item: req.params.id,
        user: req.session.user
    });

    newOffer.save()
        .then(savedOffer => {
            console.log('Saved offer:', savedOffer);

            // Find the item and increment its totalOffers field
            return Item.findByIdAndUpdate(req.params.id, { $inc: { totalOffers: 1 } }, { new: true })
                .then(() => savedOffer); // Return savedOffer to the next .then() block
        })
        .then(savedOffer => {
            res.render('offers', { offer: savedOffer }); // Render the offer.ejs page with the new offer
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
};
*/
exports.createOffer = function(req, res) {
    console.log(req.body)
    const offerAmount = req.body.offerAmount;

    const newOffer = new Offer({
        amount: offerAmount,
        item: req.params.id,
        user: req.session.user
    });

    newOffer.save()
        .then(savedOffer => {
            console.log('Saved offer:', savedOffer);

            // Find the item and increment its totalOffers field
            return Item.findByIdAndUpdate(req.params.id, { $inc: { totalOffers: 1 } }, { new: true })
                .then(updatedItem => {
                    // Find the highest offer for the item
                    return Offer.find({ item: req.params.id }).sort({ amount: -1 }).limit(1)
                        .then(highestOffers => {
                            // Flash a success message
                            req.flash('success', 'You have successfully made an offer');
                            // Render the item page with the highest offer
                            res.render('item', { item: updatedItem, highestOffer: highestOffers[0] });
                        });
                });
        })
        .catch(err => {
            console.error(err);
            req.flash('error', 'An error occurred while creating the offer');
            res.status(500).send(err);
        });
};
