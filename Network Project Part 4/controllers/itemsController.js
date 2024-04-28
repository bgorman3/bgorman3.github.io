const itemsModel = require('../models/itemModel');
const User = require('../models/userModel');
const fs = require('fs');
const { default: mongoose } = require('mongoose');
const path = require('path');


exports.getAllItems = (req, res, next) => {
    itemsModel.find()


    
        .then(allItems => {
            if (allItems.length === 0) {
                console.log('No items found in the database');
            } else {
                // Sort items by price in ascending order
                allItems.sort((a, b) => a.price - b.price);
                console.log('Items received from the database:', allItems);
            }
            // Render view with data
            res.render('items', { items: allItems });
        })
        .catch(err => {
            console.error('Error fetching items from the database:', err);
            next(err);
        });
};




exports.getItemDetails = (req, res, next) => {
    const itemId = req.params.id; // No need to parse to integer
    if(!itemId.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid Item id');
        err.status = 400;
        return next(err);
    }
    console.log('Requested Item ID:', itemId);

    // Use the model's method to get the item by ID
    itemsModel.findById(itemId)
   
        .then(item => {
            console.log('Retrieved Item:', item);
            if (item) {
                res.render('item', { item: item }); // Render the 'item' view instead of 'searchResults'
            } else {
                res.status(404).render('error', { message: 'Item not found' });
            }
        })
        .catch(err => {
            console.error('Error fetching item from the database:', err);
            next(err);
        });
};


exports.searchItems = (req, res) => {
    const searchTerm = req.query.term.toLowerCase();
    itemsModel.find({
        $or: [
            { title: new RegExp(searchTerm, 'i') },
            { details: new RegExp(searchTerm, 'i') }
        ]
    })
    .then(searchResults => {
        if (searchResults && searchResults.length > 0) {
            res.render('searchResults', { results: searchResults });
        } else {
            // Handle the case where no results are found
            res.render('noResults', { message: 'No items found' }); // Render a 'noResults' view instead of an error
        }
    })
    .catch(err => {
        // Handle the error
        res.status(500).render('error', { message: 'An error occurred while searching for items' });
    });
};


exports.createItem = (req, res, next) => {
    console.log('Form data received:', req.body); // Log the received form data

    // Ensure that req.body is defined and contains the expected properties
    if (req.body && req.body.title) {
        // Fetch the user from the database
        User.findById(req.session.user)
            .then(user => {
                if (user) {
                    // Access form data from req.body
                    const newItem = new itemsModel({
                        title: req.body.title,
                        seller: user.firstName + ' ' + user.lastName,
                        condition: req.body.condition,
                        price: parseFloat(req.body.price),
                        details: req.body.details,
                        image: req.body.image, // Use the uploaded image path or default to the default image
                        totalOffers: 0,
                        active: true
                    });

                    // Save the new item to the database
                    newItem.save()
                        .then((item) => {
                            console.log(item);
                            req.flash('success', 'Item created successfully');
                            res.redirect('items');
                        })
                        .catch(err => {
                            if(err.name === 'ValidationError') {
                                err.status = 400;
                            }
                            req.flash('error', 'An error occurred while creating the item');
                            next(err);
                        });
                } else {
                    // Handle case when user is not found in the database
                    res.status(400).send('User not found');
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    } else {
        // Handle the case when form data is missing or incorrect
        res.status(400).send('Invalid form data');
    }
};
exports.editItemView = async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await itemsModel.findById(itemId);
        if (item) {
            res.render('edit', { item: item });
        } else {
            res.status(404).render('error', { message: 'Item not found' });
        }
    } catch (err) {
        res.status(500).render('error', { message: 'An error occurred' });
    }
};

exports.editItem = async (req, res) => {
    const itemId = req.params.id;
    const updatedFields = req.body;
    updatedFields.price = parseFloat(updatedFields.price);

    if (req.file) {
        updatedFields.image = `/images/${req.file.filename}`;
    }

    try {
        const item = await itemsModel.findByIdAndUpdate(itemId, updatedFields, { new: true });
        if (item) {
            req.flash('success', 'Item updated successfully');
           return res.redirect(`/items`); // Redirect to the items page
        } else {
            req.flash('error', 'Item not found');
            res.status(404).render('error', { message: 'Item not found' });
        }
    } catch (err) {
        req.flash('error', 'An error occurred while updating the item');
        res.status(500).render('error', { message: 'An error occurred' });
    }
};


exports.deleteItem = (req, res) => {
    let itemId = req.params.id;
    itemsModel.findOneAndDelete({_id: itemId})
        .then(docs => {
            if(docs) {
                req.flash('success', 'Item deleted successfully');
                res.send(docs);
                console.log("Deleted : ", docs);
            } else {
                req.flash('error', 'Item not found');
                res.status(404).send('Item not found');
            }
        })
        .catch(err => {
            req.flash('error', 'An error occurred while deleting the item');
            console.log(err);
            res.status(500).send(err);
        });
};


exports.renderSellPage = (req, res) => {
    // Check if the user object exists
    if (req.session.user) {
        // Fetch the user from the database
        User.findById(req.session.user)
            .then(user => {
                if (user) {
                    console.log(user.firstName, user.lastName); // Log the first and last name

                    // Render the "Sell" page
                    res.render('new', {
                        firstName: user.firstName,
                        lastName: user.lastName
                    });
                } else {
                    req.flash('error', 'User not found');
                    res.redirect('/login');
                }
            })
            .catch(err => {
                req.flash('error', 'An error occurred while fetching the user');
                console.log(err);
                res.status(500).send(err);
            });
    } else {
        // Redirect to login or show an error
        res.redirect('/login');
    }
};