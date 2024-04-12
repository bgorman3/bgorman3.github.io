
const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const multer = require('multer');
const path = require('path');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const { validateId } = require('../middlewares/validator');


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

router.get('/items/new', isLoggedIn, itemsController.renderSellPage); // New item form
router.post('/items', isLoggedIn, upload.single('image'), itemsController.createItem); // Create a new item
router.get('/items/search', itemsController.searchItems); // Search for items
router.get('/items/:id', validateId, itemsController.getItemDetails); // Get item details
router.get('/items/:id/edit', isLoggedIn, isAuthor, validateId, itemsController.editItemView);
router.post('/items/:id/edit', isLoggedIn, isAuthor, validateId, upload.single('image'), itemsController.editItem);
router.delete('/items/:id', isLoggedIn, isAuthor, validateId, itemsController.deleteItem);
router.get('/items', itemsController.getAllItems); // List all items



module.exports = router;
