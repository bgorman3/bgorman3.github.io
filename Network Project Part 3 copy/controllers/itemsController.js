const itemsModel = require('../models/itemModel');
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
        // Access form data from req.body
        const newItem = new itemsModel({
            title: req.body.title,
            seller: req.body.seller,
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
                // Redirect to the item listing page
                res.redirect('items');
            })
            .catch(err => {
                if(err.name === 'ValidationError') {
                    err.status = 400;
                }
                next(err);
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
           return res.redirect(`/items`); // Redirect to the items page
        } else {
            res.status(404).render('error', { message: 'Item not found' });
        }
    } catch (err) {
        res.status(500).render('error', { message: 'An error occurred' });
    }
};


exports.deleteItem = (req, res) => {
    let itemId = req.params.id;
    itemsModel.findOneAndDelete({_id: itemId})
        .then(docs => {
            if(docs) {
                res.send(docs);
                console.log("Deleted : ", docs);
            } else {
                res.status(404).send('Item not found');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
};


exports.renderSellPage = (req, res) => {
    // Render the "Sell" page
    res.render('new');
};





























/*first to get rid o f 

exports.updateItem = (req, res, next) => {
    const itemId = req.params.itemId;
    const updatedItem = req.body;

    if (auctionItems.updateById(itemId, updatedItem)) {
        // Redirect to the items page after successful update
        res.redirect('/items');
    } else {
        // Handle error (e.g., item not found)
        const err = new Error('Cannot find an item with id ' + itemId);
        err.status =  404;
        next(err);
    }
};

exports.editItem = (req, res) => {
    const itemId = req.params.itemId;
    const item = auctionItems.findById(itemId);

    if (!item) {
        res.status(404).send('Item not found');
        return;
    }

    res.render('pages/edit', { item: item });
};



/*exports.edit = (req, res, next) => {
    let itemId = req.params.itemId;
    let item = model.findById(itemId);
    if (item) {
        res.render('pages/edit', {item: item});
    } else{
        let err = new Error('Cannot find a item with id ' + itemId);
        err.status = 404;
        next(err);
    }
};

exports.updateItem = (req, res, next) => {
    const itemId = req.params.itemId;
    const updatedItem = req.body;

    if (auctionItems.updateById(itemId, updatedItem)) {
        // Sort items after updating
        auctionItems.auctionItems.sort((a, b) => a.price - b.price);
        // Redirect to the items page after successful update
        res.redirect('/items');
    } else {
        // Handle error (e.g., item not found)
        const err = new Error('Cannot find an item with id ' + itemId);
        err.status =  404;
        next(err);
    }
};

*/ /*second
exports.deleteItem = (req, res) => {
    const itemId = req.params.itemId;
    const index = auctionItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
        auctionItems.splice(index,   1);
        res.redirect('/items'); // Redirect to items page after deletion
    } else {
        
        res.status(404).send('Item not found');
    }
};

exports.renderItemsPage = (req, res) => {
    const sortBy = req.query.sortBy;
    let sortedItems = [...auctionItems.find()]; // Retrieve all items

    if (sortBy === 'price') {
        sortedItems.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'dateTaken') {
        sortedItems.sort((a, b) => new Date(a.dateTaken) - new Date(b.dateTaken));
    }

    res.render('pages/items', { items: sortedItems });
};

exports.renderItemPage = (req, res) => {
    const itemId = req.params.itemId;
    const item = auctionItems.find(item => item.id.toString() === itemId);

    if (!item) {
        res.status(404).send('Item not found');
        return;
    }

    res.render('pages/item', { item: item });

   
};
exports.renderNewItemForm = (req, res) => {
    res.render('pages/new-item');
};
exports.addItem = (req, res) => {
    const newItem = req.body;

    // Validate newItem here if needed

    auctionItems.save(newItem); // Assuming auctionItems is imported correctly

    res.redirect('/items'); // Redirect to the items page after adding the new item
};

/*
exports.renderItemsPage = (req, res) => {
    // Assuming auctionItems is imported correctly from your model
    res.render('pages/items', { items: auctionItems.auctionItems });
};
*/
