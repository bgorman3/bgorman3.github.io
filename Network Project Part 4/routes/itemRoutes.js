const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const multer = require('multer');
const path = require('path');
const {isLoggedIn, isAuthor, isNotSeller,isSeller} = require('../middlewares/auth');
const { validateId } = require('../middlewares/validator');
const offerRoutes = require('./offerRoutes');
const offerController = require('../controllers/offerController');

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

// Create a new router for item related routes
const itemRouter = express.Router();
router.use('/items', itemRouter);

// Now you can define routes on itemRouter
itemRouter.get('/new', isLoggedIn, itemsController.renderSellPage); // New item form
itemRouter.post('/', isLoggedIn, upload.single('image'), itemsController.createItem); // Create a new item
itemRouter.get('/search', itemsController.searchItems); // Search for items
itemRouter.get('/:id', validateId, itemsController.getItemDetails); // Get item details
itemRouter.get('/:id/edit', isLoggedIn, isAuthor, validateId, itemsController.editItemView);
itemRouter.post('/:id/edit', isLoggedIn, isAuthor, validateId, upload.single('image'), itemsController.editItem);
itemRouter.delete('/:id', isLoggedIn, isAuthor, validateId, itemsController.deleteItem);
itemRouter.get('/', itemsController.getAllItems); // List all items
itemRouter.post('/:id/offers',isLoggedIn, offerController.createOffer); // Create an offer
itemRouter.get('/:id/offers', isLoggedIn, offerController.getOffers); // Get offers
itemRouter.get('/:id/productoffers', isLoggedIn, offerController.viewAllOffers); // View all offers on a specific item


// Add the offerRoutes to the itemRouter
itemRouter.use('/:id/offers', offerRoutes);

module.exports = router;