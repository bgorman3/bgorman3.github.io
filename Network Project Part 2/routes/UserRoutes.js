/*

const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// Routes for items
router.get('/items/new', itemsController.renderSellPage); // New item form
router.post('/items', itemsController.createItem); // Create a new item
router.get('/items/search', itemsController.searchItems); // Search for items
router.get('/items/:id/edit', itemsController.editItemView); // Edit item view
router.put('/items/:id', itemsController.editItem); // Update item
router.delete('/items/:id', itemsController.deleteItem); // Delete item
router.get('/items/:id', itemsController.getItemDetails); // Get item details
router.get('/items', itemsController.getAllItems); // List all items

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');



// Routes for items
router.get('/items/new', itemsController.renderSellPage); // New item form
router.post('/items', itemsController.createItem); // Create a new item
router.get('/items/search', itemsController.searchItems); // Search for items
router.get('/items/:id/edit', itemsController.editItemView); // Edit item view
router.put('/items/:id', itemsController.editItem); // Update item
router.delete('/items/:id', itemsController.deleteItem); // Delete item
router.get('/items/:id', itemsController.getItemDetails); // Get item details
router.get('/items', itemsController.getAllItems); // List all items

module.exports = router;
