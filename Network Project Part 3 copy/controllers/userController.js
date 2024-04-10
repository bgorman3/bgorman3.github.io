const User = require('../models/userModel');
const itemsModel = require('../models/itemModel');

module.exports.renderSignupForm = (req, res) => {
    res.render('newuser');
};



exports.create = (req, res, next) => {
    let user = new User(req.body); // Create a new instance of User
    user.save()
    .then(user => res.redirect('/user/login')) // Redirect to '/user/login'
    .catch(err => {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);  
            return res.redirect('/user/newuser'); // Redirect to '/user/newuser'
        }

        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            return res.redirect('/user/newuser'); // Redirect to '/user/newuser'
        }
        
        next(err);
    }); 
};

exports.getUserLogin = (req, res, next) => {
  
    return res.render('login');
  
}