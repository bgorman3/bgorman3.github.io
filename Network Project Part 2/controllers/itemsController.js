const itemsModel = require('../models/itemModel');
const fs = require('fs');
const path = require('path');

exports.getAllItems = (req, res) => {
    const allItems = itemsModel.getAllItems();
    // Sort items by price in ascending order
    allItems.sort((a, b) => a.price - b.price);
    // Render view with data
    if(itemsModel) {
        res.render('items', { items: allItems });
    }
    
};

exports.searchItems = (req, res) => {
    const searchTerm = req.query.term.toLowerCase();
    const searchResults = itemsModel.searchItems(searchTerm);
    if (searchResults && searchResults.length >  0) {
        res.render('searchResults', { results: searchResults });
    } else {
        // Handle the case where no results are found
        res.status(404).render('error', { message: 'No items found' });
    }
};



exports.getItemDetails = (req, res) => {
    const itemId = parseInt(req.params.id);
    console.log('Requested Item ID:', itemId);
    const item = itemsModel.getItemById(itemId);
    console.log('Retrieved Item:', item);
    if (item) {
        res.render('item', { item: item }); // Render the 'item' view instead of 'searchResults'
    } else {
        res.status(404).render('error', { message: 'Item not found' });
    }
};





exports.createItem = (req, res) => {
    console.log('Form data received:', req.body); // Log the received form data
    // Ensure that req.body is defined and contains the expected properties
    if (req.body && req.body.title) {
        // Access form data from req.body
        const newItem = {
            title: req.body.title,
            seller: req.body.seller,
            condition: req.body.condition,
            price: parseFloat(req.body.price),
            details: req.body.details,
            image: '/public/images/car1.png', // Default image path or update it as needed
            totalOffers: 0,
            active: true
        };

        if (req.file) {
            newItem.image = `/images/${req.file.filename}`;
        }
        
        // Add the new item to the database
        itemsModel.addItem(newItem);

        // Redirect to the item listing page
        res.redirect('items');
    } else {
        // Handle the case when form data is missing or incorrect
        res.status(400).send('Invalid form data');
    }
};


exports.editItemView = (req, res) => {
    // render edit view
    const itemId = parseInt(req.params.id);
    const item = itemsModel.getItemById(itemId);
    if (item) {
        res.render('edit', { item: item });
    } else {
        // Respond with 404 Not Found if item is not found
        res.status(404).render('error', { message: 'Item not found' });
    }
};


exports.editItem = (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedFields = req.body;
    const currentItem = itemsModel.getItemById(itemId);
   
    // Merge updated fields into the current item
    const updatedItem = { ...currentItem, ...updatedFields };
    updatedItem.price = parseInt(updatedItem.price);

    if (req.file) {
        updatedItem.image = `/images/${req.file.filename}`;
    }

    const isUpdated = itemsModel.updateItem(itemId, updatedItem);

    if (isUpdated) {
        // Redirect to the item details page
        return res.redirect(`items/${itemId}`);
    } else {
        // Handle error, item not found
        res.status(404).render('error', { message: 'Item not found' });
    }
};


exports.deleteItem = (req, res) => {
    const itemId = parseInt(req.params.id);
    const isDeleted = itemsModel.deleteItem(itemId);
    if (isDeleted) {
        // Redirect to the item listing page
        res.redirect('items');
    } else {
        // Handle error, item not found
        res.status(404).render('error', { message: 'Item not found' });   
     }
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


