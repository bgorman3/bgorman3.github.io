const { body, validationResult } = require('express-validator');

// validator.js
const mongoose = require('mongoose');

exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        let err = new Error('Invalid id');
        err.status = 400;
        return next(err);
    }
    next();
};

// middlewares/validator.js

exports.validateSignup = (req, res, next) => {
    // Check if all fields are filled
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
        req.flash('error', 'All fields are required');
        return res.redirect('user/newuser');
    }

    // Check if email is valid
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(req.body.email)) {
        req.flash('error', 'Invalid email address');
        return res.redirect('user/newuser');
    }

    // Check if password length is between 8 and 64
    if (req.body.password.length < 8 || req.body.password.length > 64) {
        req.flash('error', 'Password must be between 8 and 64 characters');
        return res.redirect('user/newuser');
    }

    // If all validations pass, call the next middleware
    next();
};

exports.validateLogin = (req, res, next) => {
    // Check if email and password are filled
    if (!req.body.email || !req.body.password) {
        req.flash('error', 'Email and password are required');
        return res.redirect('/user/login');
    }

    // Check if email is valid
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(req.body.email)) {
        req.flash('error', 'Invalid email address');
        return res.redirect('/user/login');
    }

    // Check if password length is between 8 and 64
    if (req.body.password.length < 8 || req.body.password.length > 64) {
        req.flash('error', 'Password must be between 8 and 64 characters');
        return res.redirect('/user/login');
    }

    // If all validations pass, call the next middleware
    next();
};
exports.validateItem = (req, res, next) => {
    // Check if title, condition, price, details, and image are filled
    if (!req.body.title || !req.body.condition || !req.body.price || !req.body.details || !req.file) {
        req.flash('error', 'All fields are required');
        return res.redirect('/items/new');
    }

    // If all validations pass, call the next middleware
    next();
};

exports.validateAndSanitizeItem = [
    body('title').trim().escape().notEmpty().withMessage('Title is required'),
    body('price').trim().escape().isNumeric().withMessage('Item amount must be a number'),
    body('details').trim().escape().notEmpty().withMessage('Details are required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error', errors.array()[0].msg);
            return res.redirect('/items/new');
        }
        next();
    }
];

exports.validateAndSanitizeLogin = [
    body('email').trim().escape().isEmail().withMessage('Invalid email address'),
    body('password').trim().escape().isLength({ min: 8, max: 64 }).withMessage('Password must be between 8 and 64 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error', errors.array()[0].msg);
            return res.redirect('/user/login');
        }
        next();
    }
];

exports.validateAndSanitizeSignup = [
    body('firstName').trim().escape().notEmpty().withMessage('First name is required'),
    body('lastName').trim().escape().notEmpty().withMessage('Last name is required'),
    body('email').trim().escape().isEmail().withMessage('Invalid email address'),
    body('password').trim().escape().isLength({ min: 8, max: 64 }).withMessage('Password must be between 8 and 64 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error', errors.array()[0].msg);
            return res.redirect('user/newuser');
        }
        next();
    }
];

exports.validateAndSanitizeOffer = [
    body('offerAmount').trim().escape().isNumeric().withMessage('Offer amount must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error', errors.array()[0].msg);
            return res.redirect('/offer/new');
        }
        next();
    }
];