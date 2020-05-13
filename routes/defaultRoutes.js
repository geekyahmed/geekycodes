const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel').User;
const storage = require('node-persist');


router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'default';

    next();
});

const counter = 0

// noinspection JSCheckFunctionSignatures
router.route('/', async (req, res) => {
    // destructure page and limit and set default values

    
    const { page = 1, limit = 10 } = req.query;

    try {
        // execute query with page and limit values
        const posts = await Post.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        // get total documents in the Posts collection 
        const count = await Posts.countDocuments();

        // return response with posts, total pages, and current page
        res.json({
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        console.error(err.message);
    }
})
    .get(defaultController.index);

// Defining Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return done(null, false, req.flash('error-message', 'User not found with this email.'));
        }

        bcrypt.compare(password, user.password, (err, passwordMatched) => {
            if (err) {
                return err;
            }

            if (!passwordMatched) {
                return done(null, false, req.flash('error-message', 'Invalid Username or Password'));
            }

            return done(null, user, req.flash('success-message', 'Login Successful'));
        });

    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


// noinspection JSCheckFunctionSignatures
router.route('/login')
    .get(defaultController.loginGet)
    .post(passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true,
        session: true
    }), defaultController.loginPost);


// noinspection JSCheckFunctionSignatures
router.route('/register')
    .get(defaultController.registerGet)
    .post(defaultController.registerPost);


router.route('/post/:id')
    .get(defaultController.getSinglePost)
    .post(defaultController.submitComment);


router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success-message', 'Logout was successful');
    res.redirect('/');
});

module.exports = router;
