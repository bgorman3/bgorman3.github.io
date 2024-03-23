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
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'public','images'); // Adjust the path as per your directory structure
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
        console.log(file);
        // Include the path to the image file in req.body.image
        req.body.image = '/public/images/' + fileName;
    }
});






const upload = multer({ storage: storage });
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'images')); // specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
        cb(null, fileName);

        // Store the file path in req.body so it can be saved in the database
        req.body.image = '/images/' + fileName;
    }
});

const upload = multer({ storage: storage });
*/
// Routes for items
router.get('/items/new', itemsController.renderSellPage); // New item form
router.post('/items', upload.single('image'), itemsController.createItem); // Create a new item
router.get('/items/search', itemsController.searchItems); // Search for items
router.get('/items/:id', itemsController.getItemDetails); // Get item details
router.get('/items/:id/edit', itemsController.editItemView);
router.post('/items/:id/edit', upload.single('image'), itemsController.editItem);
router.delete('/items/:id', itemsController.deleteItem);
router.get('/items', itemsController.getAllItems); // List all items

module.exports = router;
