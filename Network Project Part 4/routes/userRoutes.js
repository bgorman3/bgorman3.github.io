const userController = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

// Define routes on router
router.get('/newuser', isGuest, userController.renderSignupForm);
router.post('/', isGuest, userController.create);
router.get('/login', isGuest, userController.getUserLogin);
router.post('/login', isGuest, userController.login);
router.get('/profile', isLoggedIn, userController.profile);
router.get('/logout', isLoggedIn, userController.logout);

module.exports = router;