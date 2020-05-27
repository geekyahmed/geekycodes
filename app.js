/* Importing Different Modules */

const { globalVariables } = require('./config/configuration');
const storage = require('node-persist')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const { mongoDbUrl,mongoDbUrl_dev, PORT } = require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const { selectOption } = require('./config/customFunctions');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const compression = require('compression');

const app = express();
const seo = require('express-seo')(app);

// For internatanalization, set the supported languages
seo.setConfig({
    langs: ["en"]
});

// Set the default tags
seo.setDefaults({
    html: "<a href='https://twitter.com/geekyahmed'>Follow me on twitter</a>" ,// Special property to insert html in the body (interesting to insert links)
    title: "Geeky ahmed", // Page title
    // All the other properties will be inserted as a meta property
    description: {
        en: "The best place to learn web development and modern web technologies to build modern web applications",
    },
    image: "https://avatars1.githubusercontent.com/u/42346847?s=460&u=f154ee34c4a166dfee1d017a930f065df0112b41&v=4"
});

// Create an seo route
seo.add("/contact", function(req, opts, next) {
    /*
    req: Express request
    opts: Object {
        service: String ("facebook" || "twitter" || "search-engine")
        lang: String (Detected language)
    }
    */
    next({
        description: "Amazing contact page"
    });
});


// Configure Mongoose to Connect to MongoDB
mongoose.connect(mongoDbUrl, { useNewUrlParser: true })
    .then(response => {
        console.log("MongoDB Connected Successfully.");
    }).catch(err => {
        console.log("Database connection failed.");
    });




/* Configure express*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression())


/*  Flash and Session*/
app.use(session({
    secret: 'johnnywick',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

/* Passport Initialize */
app.use(passport.initialize());
app.use(passport.session());

/* Use Global Variables */
app.use(globalVariables);


/* File Upload Middleware*/
app.use(fileUpload());

/* Setup View Engine To Use Handlebars */
app.engine('handlebars', hbs({ defaultLayout: 'default', helpers: { select: selectOption } }));
app.set('view engine', 'handlebars');


/* Method Override Middleware*/
app.use(methodOverride('newMethod'));


    /* Routes */
    const defaultRoutes = require('./routes/defaultRoutes');
    const adminRoutes = require('./routes/adminRoutes');

    // aap.get('/', (req, res)=> {

    // })

    app.use('/', defaultRoutes);
    app.use('/admin', adminRoutes);

    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    })

    /* Start The Server */
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
