
const itemsModel = require('../models/itemModel');
const User = require('../models/userModel');

//check if user is a guest
exports.isGuest = (req, res, next) => {
    if(!req.session.user) {
    return next();
    }
    else{
        req.flash('error', 'You are already logged in');
       return res.redirect('/user/profile');
    }
};
//check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if(req.session.user) {
    return next();
    }
    else{
        req.flash('error', 'You need to login first');
       return res.redirect('/user/login');
    }
};
//check if user is author of story
exports.isAuthor = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    
    itemsModel.findById(id)
    .then(item => {
        if (item){
            // Fetch the user from the database
            User.findById(req.session.user)
            .then(user => {
                if (user) {
                    // Check if the seller of the item matches the user's first and last name
                    if(item.seller == user.firstName + ' ' + user.lastName) {
                        return next();
                    } else {
                        let err = new Error('You are not authorized to perform this action');
                        err.status = 401;
                        return next(err);
                    }
                } else {
                    let err = new Error('User not found');
                    err.status = 400;
                    return next(err);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
        }
        else {
            let err = new Error('Cannot find an item with id ' + id);
            err.status = 404;
            return next(err);
        }
    });
};

//