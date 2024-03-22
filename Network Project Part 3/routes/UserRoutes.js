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
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'images')); // specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



// Routes for items
router.get('/items/new', itemsController.renderSellPage); // New item form
router.post('/items', itemsController.createItem); // Create a new item
router.get('/items/search', itemsController.searchItems); // Search for items
router.get('/items/:id/edit', itemsController.editItemView);
router.post('/items/:id/edit', itemsController.editItem);
router.post('/items/:id/delete', itemsController.deleteItem);
router.get('/items/:id', itemsController.getItemDetails); // Get item details
router.get('/items', itemsController.getAllItems); // List all items

module.exports = router;
