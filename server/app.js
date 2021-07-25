const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

//connect mongodb
require('dotenv').config();
mongoose.connect(
    process.env.URI,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    },
    () => {
        console.log("mongoose is connected");
    }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.ORIGIN,
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SECRET_CODE,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser(process.env.SECRET_CODE));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport_config')(passport);

//routes
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api.users'));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

module.exports = app;