module.exports = {
    mongoDbUrl: 'mongodb+srv://ahmed:adesewa19@cluster0-qq2gg.mongodb.net/geeky_codes?retryWrites=true&w=majority',
    // mongoDbUrl: 'mongodb://localhost:27017/bankoleahmed',
    PORT: process.env.PORT || 3000,
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        res.locals.user = req.user || null;
        next();
    },


};
