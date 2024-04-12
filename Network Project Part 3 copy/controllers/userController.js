const User = require('../models/userModel');
const itemsModel = require('../models/itemModel');

module.exports.renderSignupForm = (req, res) => {
    res.render('newuser');
};



exports.create = (req, res, next) => {
    let user = new User(req.body); // Create a new instance of User
    user.save()
    .then(user => {
        req.flash('success', 'You have successfully created an account');
        res.redirect('/user/login'); // Redirect to '/user/login'
    })
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


exports.login = (req, res, next)=>{
   
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'wrong email address');  
            res.redirect('/user/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                   req.flash('success', 'You have successfully logged in');
                    res.redirect('/user/profile');
            } else {
                req.flash('error', 'wrong password');      
                res.redirect('/user/login');
            }
            });     
        }     
    })
    .catch(err => {
        req.flash('error', 'An error occurred during login');
        res.redirect('/user/login');
    });
};


exports.profile = (req, res, next) => {
    let id = req.session.user;
    User.findById(id)
    .then(user => {
        if (user) {
            itemsModel.find({seller: user.firstName + ' ' + user.lastName})
            .then(items => {
                res.render('profile', {user, items});
            })
            .catch(err => next(err));
        } else {
            let err = new Error('User not found');
            err.status = 400;
            return next(err);
        }
    })
    .catch(err => {
        req.flash('error', 'An error occurred while retrieving the profile');
        res.redirect('/user/profile');
    });
};

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if(err) 
            return next(err);
        else {
            
            res.redirect('/');  
        }
    });
};