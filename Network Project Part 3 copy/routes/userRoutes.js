const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const path = require('path');


router.get('/newuser',isGuest, userController.renderSignupForm);
router.post('/', isGuest, userController.create);
//router.post('/user', userController.create);
router.get('/login',isGuest, userController.getUserLogin);
router.post('/login',isGuest, userController.login);
//GET /users/profile: send user's profile page
router.get('/profile', isLoggedIn, userController.profile);
router.get('/logout',isLoggedIn, userController.logout);



module.exports = router;