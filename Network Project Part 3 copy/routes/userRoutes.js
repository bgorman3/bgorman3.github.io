const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');


router.get('/newuser', userController.renderSignupForm);
router.post('/user', userController.create);
router.get('/login', userController.getUserLogin);





/*router.post('/items', upload.single('image'), itemsController.createItem); // Create a new item
router.get('/items/search', itemsController.searchItems); // Search for items
router.get('/items/:id', itemsController.getItemDetails); // Get item details
router.get('/items/:id/edit', itemsController.editItemView);
router.post('/items/:id/edit', upload.single('image'), itemsController.editItem);
router.delete('/items/:id', itemsController.deleteItem);
router.get('/items', itemsController.getAllItems); // List all items
*/
module.exports = router;