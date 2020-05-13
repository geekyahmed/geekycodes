const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const Comment = require('../models/CommentModel').Comment;
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel').User;


module.exports = {

    index: async (req, res) => {

        const posts = await Post.find().exec();
        const categories = await Category.find();
        const articles = await Post.find().exec();
        const articles2 = await Post.find().exec();
        const articles3 = await Post.find().exec();

        const randomPost = articles[Math.floor(Math.random() * articles.length)];
        const randomPost2 = articles2[Math.floor(Math.random() * 6)];
        const randomPost3 = articles3[Math.floor(Math.random() * 3)];
        res.render('default/index', { posts: posts, categories: categories, article: randomPost, article2: randomPost2, article3: randomPost3 });
    },

    erorrGet: (req, res, next) => {
        if (res.status(404)) {
            res.render('default/404', { message: req.flash('error') })
        }
        else {
            next();
        }
    },

    /* LOGIN ROUTES */
    loginGet: (req, res) => {
        res.render('default/login', { message: req.flash('error') });
    },


    loginPost: (req, res, next) => {
        next();
    },

    /* REGISTER ROUTES*/

    registerGet: (req, res) => {
        res.render('default/register');
    },

    registerPost: (req, res) => {
        let errors = [];

        if (!req.body.firstName) {
            errors.push({ message: 'First name is mandatory' });
        }
        if (!req.body.lastName) {
            errors.push({ message: 'Last name is mandatory' });
        }
        if (!req.body.email) {
            errors.push({ message: 'Email field is mandatory' });
        }
        if (!req.body.password || !req.body.passwordConfirm) {
            errors.push({ message: 'Password field is mandatory' });
        }
        if (req.body.password !== req.body.passwordConfirm) {
            errors.push({ message: 'Passwords do not match' });
        }

        if (errors.length > 0) {
            res.render('default/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        } else {
            User.findOne({ email: req.body.email }).then(user => {
                if (user) {
                    req.flash('error-message', 'Email already exists, try to login.');
                    res.redirect('/login');
                } else {
                    const newUser = new User(req.body);

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;
                            newUser.save().then(user => {
                                req.flash('success-message', 'You are now registered');
                                res.redirect('/login');
                            });
                        });
                    });
                }
            });
        }
    },

    getSinglePost: (req, res) => {
        const id = req.params.id;

        Post.findById(id)
            .populate({ path: 'comments', populate: { path: 'user', model: 'user' } })
            .then(post => {
                if (!post) {
                    res.status(404).render('default/404');
                }
                else {
                    res.render('default/singlePost', { post: post, comments: post.comments });
                }
            })
    },

    submitComment: (req, res) => {

        if (!req.user) {
            Post.findById(req.body.id).then(post => {
                const newComment = new Comment({
                    full_name: req.body.full_name,
                    email: req.body.email,
                    body: req.body.comment_body
                });

                post.comments.push(newComment);
                post.save().then(savedPost => {
                    newComment.save().then(savedComment => {
                        req.flash('success-message', 'Your comment was submitted for review.');
                        res.redirect(`/post/${post._id}`);
                    });
                });


            })
        }

        else {
            req.flash('error-message', 'Login first to comment');
            res.redirect('/login');
        }

    }

};

