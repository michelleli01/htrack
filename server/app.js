var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

require('./models/db').connect("mongodb+srv://michelleli:denhop1009@users.ecemm.mongodb.net/node-auth");
const authMiddleware = require('./passport/auth_middleware');

const app = express();
const PORT=8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
const authRouter = require('./routes/auth');

app.use('/auth', authRouter);

// set up passport
app.use(passport.initialize());
passport.use("local-signup", require('./passport/signup_passport'));
passport.use("local-login", require('./passport/login_passport'));


//error handling
app.use(function(req, res, next){
    next(createError(404));
});

app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render('error')
});

app.listen(PORT, ()=>{
    console.log(`[SERVER] listening on: ${PORT}`)
})

module.exports = app;