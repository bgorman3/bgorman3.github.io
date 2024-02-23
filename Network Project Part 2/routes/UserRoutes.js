const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/item', UserController.renderItemPage);
// Route to render the item page


// Route to render the items page
router.get('/items', UserController.renderItemsPage);

// Route to render the new page
router.get('/new', UserController.renderNewPage);

module.exports = router;
